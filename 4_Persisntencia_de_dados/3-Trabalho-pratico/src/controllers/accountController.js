import accountModel from '../models/accountModel.js';

function getAllAccounts() {
  return accountModel.find();
}

async function deposito(ag = 0, acc = 0, value = 0) {
  const field = { agencia: ag, conta: acc };
  let account = await accountModel.findOne(field);
  if (!account) return account;
  account.balance += value;
  return accountModel.findOneAndUpdate(field, account, { new: true });
}

async function saque(ag = 0, acc = 0, value = 0) {
  const field = { agencia: ag, conta: acc };
  let account = await accountModel.findOne(field);

  if (!account) return account;
  if (account.balance - (value + 1) < 0) throw Error('Saldo insuficiente');

  account.balance -= value + 1;
  return accountModel.findOneAndUpdate(field, account, { new: true });
}

async function deleteAccount(ag = 0, acc = 0) {
  const field = { agencia: ag, conta: acc };
  let account = await accountModel.findOne(field);

  if (!account) return account;

  return await accountModel.remove(field);
}

async function getBalance(ag = 0, acc = 0) {
  const field = { agencia: ag, conta: acc };
  let account = await accountModel.findOne(field);

  if (!account) throw { message: 'Conta não encontrada', errNumber: 404 };

  return account.balance;
}

async function doTransfer(ago, acco, agd, accd, value) {
  value = Number(value);
  if (value <= 0) {
    throw { message: 'Valor negativo, ou nulo', errNumber: 400 };
  }

  const originField = { agencia: ago, conta: acco };
  const destField = { agencia: agd, conta: accd };

  let originAccount = await accountModel.findOne(originField);
  const destAccount = await accountModel.findOne(destField);

  if (!originAccount || !destAccount)
    throw { message: 'Conta não encontrada', errNumber: 404 };

  const taxa = ago === agd ? 0 : 8;

  if (originAccount.balance - (value + taxa) < 0)
    throw {
      message: 'Conta de origem não possui saldo suficiente',
      errNumber: 404,
    };

  originAccount.balance -= value + taxa;
  destAccount.balance += value;

  await accountModel.update(destField, destAccount);

  originAccount = await accountModel.findOneAndUpdate(
    originField,
    originAccount,
    { new: true }
  );

  return originAccount.balance;
}

async function getBalanceAvgByAg(ag = 0) {
  const field = { agencia: ag };
  const accounts = await accountModel.find(field);

  if (accounts.length === 0)
    throw {
      message: 'Não encontradas contas com esse numero de agência',
      errNumber: 404,
    };

  let sum = 0;
  accounts.forEach((account) => {
    sum += account.balance;
  });

  return sum / accounts.length;
}

async function getLeastBalances(limit = 1) {
  const accounts = await accountModel
    .find({}, { agencia: 1, conta: 1, balance: 1 })
    .sort({ balance: 1 })
    .limit(Number(limit));

  if (accounts.length === 0)
    throw { message: 'Contas não encontradas', errNumber: 404 };

  return accounts;
}

async function getHigherBalances(limit = 1) {
  const accounts = await accountModel
    .find({}, { agencia: 1, conta: 1, name: 1, balance: 1 })
    .sort({ balance: -1, name: 1 })
    .limit(Number(limit));

  console.log(accounts);

  if (accounts.length === 0)
    throw { message: 'Contas não encontradas', errNumber: 404 };

  return accounts;
}

async function changeToPrivateAg() {
  const accounts = await accountModel.find();
  let newAccounts = [];
  let topAccounts = [];
  let ags = new Set();
  accounts.forEach((account) => ags.add(account.agencia));
  console.log(ags);

  ags.forEach((ag) => {
    let agAccounts = accounts.filter(({ agencia }) => agencia === ag);
    agAccounts.sort((a, b) => -a.balance + b.balance);
    topAccounts.push(agAccounts[0]);
  });

  topAccounts = topAccounts.map((account) => {
    account.agencia = 99;
    return account;
  });

  topAccounts.forEach(async (account) => {
    const test = await accountModel.findByIdAndUpdate(
      { _id: account._id },
      account,
      { new: true }
    );
  });

  return topAccounts;
}

export {
  getAllAccounts,
  deposito,
  saque,
  deleteAccount,
  getBalance,
  doTransfer,
  getBalanceAvgByAg,
  getLeastBalances,
  changeToPrivateAg,
  getHigherBalances,
};
