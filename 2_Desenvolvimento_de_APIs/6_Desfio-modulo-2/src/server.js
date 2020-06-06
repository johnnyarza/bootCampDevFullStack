const express = require('express');
const app = express();
const utils = require('./utils/utils');
const port = 3003;
const gradesRouter = require('./router/routerGrades');
const winston = require('winston');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../src/doc/doc.js');

let grades = {};

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-control-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

app.use(express.json());
app.use('/grades', gradesRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function loadGradesFile() {
  return utils.readFile('./src/database/grades.json');
}

app.listen(port, async () => {
  try {
    grades = JSON.parse(await loadGradesFile());
    module.exports = grades;
    console.log('API started');
    logger.info('API started');
  } catch (err) {
    logger.error(err.message);
    console.log(err.message);
  }
});
