const express = require('express');
const router = express.Router();
const { readFile, writeFile } = require('fs').promises;
const inserirLancamento = require('../controllers/lacamentoController');
const { media, somatoria } = require('../libs/calculos');
global.fileName = 'lancamentos.json';

router.get('/media', async (req, res) => {
  const data = await readFile(global.fileName);
  const json = JSON.parse(data);
  const array = json.lancamentos.map((lancamento) => lancamento.valor);
  console.log(array);
  res.send({ media: media(array) });
});

router.post('/receita', async (req, res) => {
  try {
    let lancamento = req.body;
    lancamento = await inserirLancamento(lancamento);
    res.send(lancamento);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

router.post('/despesa', async (req, res) => {
  try {
    let lancamento = req.body;
    lancamento = await inserirLancamento(lancamento, 'D');
    res.send(lancamento);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/totalMes/:mes', async (req, res) => {});
module.exports = router;
