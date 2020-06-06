import express from 'express';
import fs from 'fs';
import winston from 'winston';
import accountRouter from './routers/accounts.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';

const app = express();

global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

app.use(express.json()); // necessario para a API saber q estamos usando JSON
app.use('/account', accountRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, async () => {
  //aqui que a API começa executando um callback
  try {
    await initialJsonFile();
  } catch (err) {
    createInitialJsonFile();
  }
  logger.info('API started');
});

function initialJsonFile() {
  return fs.promises.readFile(global.fileName, 'utf8');
}

function createInitialJsonFile() {
  const initialJson = {
    nextId: 1,
    accounts: [],
  };
  fs.writeFile(global.fileName, JSON.stringify(initialJson), (err) => {
    if (err) logger.console.error(err);
  });
}
