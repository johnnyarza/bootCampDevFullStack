import express from 'express';
import fs from 'fs';
import Utils from '../js/utils.js';
import cors from 'cors';
const router = express.Router();

router.post('/', async (req, res) => {
  //foi retirado o /account pq no index o redirecionamento ocorre com /account
  try {
    let account = req.body;
    insertAccount(res, await readFile(), account);
    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (err) {
    logger.error(`POST /account - ${err.message}`);
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (_, res) => {
  try {
    let json = JSON.parse(await readFile());
    delete json.nextId;
    res.send(json);
    logger.info(`GET /account - ${JSON.stringify(json)}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET /account - ${err.message}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const json = JSON.parse(await readFile());
    const ac = json.accounts.find((acc) => acc.id === parseInt(req.params.id));
    res.send(ac);
    logger.info(`GET /account/:id - ${JSON.stringify(ac)}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET /account/:id - ${err.message}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    deleteAccount(res, await readFile(), parseInt(req.params.id));
    logger.info(`DELETE /account/:id - id: ${req.params.id}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`DELETE /account/:id - id: ${err.message}`);
  }
});

router.put('/', async (req, res) => {
  try {
    let account = req.body;
    await updateAccount(res, await readFile(), account);
    logger.info(`PUT /account -${account}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`DELETE /account/:id - id: ${err.message}`);
  }
});

router.post('/transaction', async (req, res) => {
  try {
    let account = req.body;
    transactionAccount(res, await readFile(), account);
    logger.info(`POST /account/transaction - ${account}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`POST /account/transaction -  ${err.message}`);
  }
});

function transactionAccount(res, data, account) {
  let json = JSON.parse(data);
  let oldIndex = json.accounts.findIndex(
    (acc) => acc.id === parseInt(account.id)
  );
  if (oldIndex === -1) throw new Error('Conta não existe');

  const oldBalance = json.accounts[oldIndex].balance;

  if (account.value < 0 && Math.abs(account.value) > oldBalance) {
    throw new Error('Saldo insuficiente para saque');
  }
  json.accounts[oldIndex].balance += account.value;
  fs.writeFile(global.fileName, JSON.stringify(json), (err) => {
    if (err) throw err;
  });

  res.send(
    `Saldo Anterior: ${Utils.formatFloatToCurrency(oldBalance)} <br> 
    Saldo atual: ${Utils.formatFloatToCurrency(
      json.accounts[oldIndex].balance
    )}`
  );
}

async function updateAccount(res, data, newAccount) {
  try {
    let json = JSON.parse(data);
    let oldIndex = json.accounts.findIndex(
      (acc) => acc.id === parseInt(newAccount.id)
    );
    if (oldIndex === -1) throw new Error('Conta não existe');
    json.accounts[oldIndex] = newAccount;
    await writeFile(json);
    res.end();
  } catch (err) {
    //res.status(400).send({ error: err.message });
    throw Error(err);
  }
}
function writeFile(data) {
  return fs.promises.writeFile(global.fileName, JSON.stringify(data));
}
function readFile() {
  return fs.promises.readFile(global.fileName, 'utf8');
}

function deleteAccount(res, data, accountId) {
  let json = JSON.parse(data);
  const ac = json.accounts.filter((account) => account.id !== accountId);
  json.accounts = ac;
  fs.writeFile(global.fileName, JSON.stringify(json), (err) => {
    if (err) {
      console.log('erro na leitura');
      res.status(400).send({ error: err.message });
    } else {
      res.send(`Account id: ${accountId} deleted`);
    }
  });
}

function insertAccount(res, data, account) {
  let json = JSON.parse(data);
  account = { id: json.nextId, ...account };
  json.accounts.push(account);
  json.nextId++;
  fs.writeFile(global.fileName, JSON.stringify(json), (err) => {
    if (err) {
      console.log('erro na leitura');
      res.status(400).send({ error: err.message });
    } else {
      res.send(`Account ${account.name} posted with id: ${account.id}`);
    }
  });
}

//module.exports = router;
export default router;
