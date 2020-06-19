const express = require('express');
const app = express();
const { readFile, writeFile } = require('fs').promises;
const lacamentosRouter = require('./router/lancamento');

app.use(express.json());
app.use('/lancamento', lacamentosRouter);
app.listen(3000, async () => {
  try {
    const initialJson = {
      nextId: 1,
      lancamentos: [],
    };
    await writeFile('lancamentos.json', JSON.stringify(initialJson), {
      flag: 'wx',
    });
  } catch (error) {
    console.log(error.message);
  }
  console.log('API started');
});
