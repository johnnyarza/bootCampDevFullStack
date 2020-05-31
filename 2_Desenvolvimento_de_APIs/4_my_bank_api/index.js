var express = require('express');
var fs = require('fs');
const util = require('util');

var app = express();

app.use(express.json()); // necessario para a API saber q estamos usando JSON

app.post('/account', (req, res) => {
  let account = req.body;
  try {
    let data = getAccountsJSON();
    insertAccount(res, data, account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

function insertAccount(res, data, account) {
  let json = JSON.parse(data);
  account = { id: json.nextId, ...account };
  json.accounts.push(account);
  json.nextId++;
  fs.writeFile('accounts.json', JSON.stringify(json), (err) => {
    if (err) {
      console.log('erro na leitura');
      res.status(400).send({ error: err.message });
    } else {
      res.send(`Account ${account.name} posted with id: ${account.id}`);
    }
  });
}

app.get('/account', (req, res) => {
  fs.readFile('accounts.json', 'utf8', (err, data) => {});
});

function accountsPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile('accounts.json', 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function getAccountsJSON() {
  const data = await accountsPromise();
  return data;
}

app.listen(3000, () => {
  //aqui que a API começa executando um callback
  try {
    initialJsonFile();
  } catch (err) {
    console.log(err);
  }
  console.log('API started');
});

function initialJsonFile() {
  fs.readFile('accounts.json', 'utf8', (err, data) => {
    if (err) {
      createInitialJsonFile();
    }
  });
}

function createInitialJsonFile() {
  const initialJson = {
    nextId: 1,
    accounts: [],
  };
  fs.writeFile('accounts.json', JSON.stringify(initialJson), (err) => {
    if (err) console.log(err);
  });
}
