import mongoose from 'mongoose';
import express from 'express';
import studentRouter from './src/routers/studentRouter.js';

const uri = '';

const app = express();

app.use(express.json());

app.use('/student', studentRouter);

app.get('/', (req, res) => {});

app.listen(3003, async () => {
  try {
    await start();
    console.log('API started');
  } catch (error) {
    console.log(error.message);
  }
});

const start = () => {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado');
  } catch (error) {
    throw error;
  }
};
