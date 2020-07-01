import express from 'express';
import mongoose from 'mongoose';
import accountRouter from './src/routers/accountRouter.js';

const uri =
  'mongodb+srv://johnny:1a2b3c4d5e6f@cluster0.oonph.mongodb.net/my-bank-api?retryWrites=true&w=majority';
const port = 3003;
const app = express();

app.use(express.json());
app.use('/accounts', accountRouter);

app.get('/', (req, res) => {
  try {
    res.status(200).send('ok');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  try {
    connectAtlas();
    console.log('API started');
  } catch (error) {
    console.log(error);
  }
});

const connectAtlas = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
