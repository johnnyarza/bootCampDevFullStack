const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello Word!!!'));
app.post('/', (req, res) => res.send('Hello Word post!!!'));

app.listen(port, () => {
  console.log(`App listening on por ${port}`);
});
