import express from 'express';
import * as accountController from '../controllers/accountController.js';

const accountRouter = express();

accountRouter.get('/', async (req, res) => {
  try {
    const accounts = await accountController.getAllAccounts();
    res.status(200).send(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
});
accountRouter.get('/balance/:ag/:acc', async (req, res) => {
  try {
    const { ag, acc } = req.params;
    const accountBalance = await accountController.getBalance(ag, acc);

    res.status(200).send({ balance: accountBalance });
  } catch (error) {
    res.status(!!error.errNumber ? error.errNumber : 500).send(error.message);
  }
});

accountRouter.get(
  '/transfer/:ago/:acco/:agd/:accd/:value',
  async (req, res) => {
    try {
      const { ago, acco, agd, accd, value } = req.params;
      console.log(ago, acco, agd, accd, value);
      const originAccountBalance = await accountController.doTransfer(
        ago,
        acco,
        agd,
        accd,
        value
      );
      res.status(200).send({ originAccountBalance });
    } catch (error) {
      res.status(!!error.errNumber ? error.errNumber : 500).send(error.message);
    }
  }
);

accountRouter.get('/avg/:ag', async (req, res) => {
  try {
    const ag = req.params.ag;
    const avg = await accountController.getBalanceAvgByAg(ag);
    res.status(200).send({ avg });
  } catch (error) {
    res.status(!!error.errNumber ? error.errNumber : 500).send(error.message);
  }
});

accountRouter.get('/leastBalances/:limit', async (req, res) => {
  try {
    const accounts = await accountController.getLeastBalances(req.params.limit);
    res.status(200).send(accounts);
  } catch (error) {
    res.status(!!error.errNumber ? error.errNumber : 500).send(error.message);
  }
});

accountRouter.get('/higherbalances/:limit', async (req, res) => {
  try {
    const accounts = await accountController.getHigherBalances(
      req.params.limit
    );
    res.status(200).send(accounts);
  } catch (error) {
    res.status(!!error.errNumber ? error.errNumber : 500).send(error.message);
  }
});

accountRouter.get('/private', async (req, res) => {
  try {
    const accounts = await accountController.changeToPrivateAg();
    res.status(200).send(accounts);
  } catch (error) {
    res.status(!!error.errNumber ? error.errNumber : 500).send(error.message);
  }
});

accountRouter.delete('/:ag/:acc', async (req, res) => {
  try {
    const ag = req.params.ag;
    const acc = req.params.acc;

    const account = await accountController.deleteAccount(ag, acc);
    if (!account) {
      res.status(404).send('Conta não encontrada');
      return;
    }
    res.status(200).send({ count: account.deletedCount });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

accountRouter.patch('/deposito/:ag/:acc', async (req, res) => {
  try {
    const ag = req.params.ag;
    const acc = req.params.acc;
    const deposito = req.body.deposito;

    if (deposito <= 0) {
      res.status(400).send('Deposito com valor negativo ou nulo');
      return;
    }

    const account = await accountController.deposito(ag, acc, deposito);
    if (!account) {
      res.status(404).send('Conta não encontrada');
      return;
    }

    res.status(200).send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

accountRouter.patch('/saque/:ag/:acc', async (req, res) => {
  try {
    const ag = req.params.ag;
    const acc = req.params.acc;
    const saque = req.body.saque;

    if (saque <= 0) {
      res.status(400).send('Saque com valor negativo ou nulo');
      return;
    }

    const account = await accountController.saque(ag, acc, saque);
    if (!account) {
      res.status(404).send('Conta não encontrada');
      return;
    }

    res.status(200).send(account);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default accountRouter;
