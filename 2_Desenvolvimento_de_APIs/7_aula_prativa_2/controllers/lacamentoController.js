const { readFile, writeFile } = require('fs').promises;

async function inserirLancamento(lancamento, tipo) {
  try {
    const data = await readFile(global.fileName);
    const json = JSON.parse(data);

    lancamento = { id: json.nextId++, ...lancamento };
    if (tipo === 'D') lancamento.valor *= -1;
    json.lancamentos.push(lancamento);
    await writeFile(global.fileName, JSON.stringify(json));

    return lancamento;
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = inserirLancamento;
