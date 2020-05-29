import express from 'express';
import winston from 'winston';

const app = express();

app.use(express.json());

app.use(express.static('public'));
app.use('/images', express.static('public'));
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
//prettier-ignore
const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transport.Console)(),
    new (winston.transport.File)({ filename: 'grades-control-api.log' }),
  ],
  format: combine(),
});
