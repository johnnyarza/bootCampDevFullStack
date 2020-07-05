import mongoose from 'mongoose';
import express from 'express';
import studentRouter from './src/routers/studentRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb+srv://${process.env.USERDB}:${process.env.PWD}@cluster0.oonph.mongodb.net/grades?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());

app.use('/student', studentRouter);

app.get('/', (req, res) => {});

app.listen(process.env.PORT, async () => {
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
