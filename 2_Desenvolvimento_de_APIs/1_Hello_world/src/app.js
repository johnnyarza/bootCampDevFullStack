const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World 12!'));
app.post('/', (req, res) => res.send('Hello World POST!'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});