const express = require('express');
const router = express.Router();
const utils = require('../utils/utils.js');
let grades = {};
const gradesFilePath = './src/database/grades.json';

router.use('/', (req, {}, next) => {
  grades = require('../server');
  next();
});

function saveGrade(grade, gradeIndex) {
  grade.timestamp = new Date();
  if (!grade.id) {
    grade.id = grades.nextId++;
    grades.grades.push(grade);
  } else {
    grades.grades[gradeIndex] = grade;
  }
  return grade;
}

router.get('/', (req, res, next) => {
  try {
    res.send(grades.grades);
    logger.info(`GET "/grades" - succeed}`);
  } catch (err) {
    logger.error(`GET "/grades" - ${err.message}`);
    res.status(400).send(err.message);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    res.send(grades.grades.find((grade) => grade.id === id));
    logger.info(`GET "/grades/${id} - succeed`);
  } catch (err) {
    logger.error(`GET /grades/:id - ${err.message}`);
    res.status(400).send(err.message);
  }
});

router.get('/3best/type/subject/:type/:subject', (req, res, next) => {
  try {
    const type = req.params.type;
    const subject = req.params.subject;
    let filteredGrades = [];
    filteredGrades = grades.grades.filter(
      (grade) => grade.type === type && grade.subject === subject
    );
    if (filteredGrades.length === 0)
      throw { message: 'Não foi possivel encontrar notas', type, subject };
    const bestGrades = get3Best(filteredGrades);
    res.send(bestGrades);
    logger.info(
      `GET "/grades/3best/type/subject/${type}/${subject}" - succeed`
    );
  } catch (err) {
    logger.error(
      `GET /grades/3best/type/subject/${err.type}/${err.subject} - ${err.message}`
    );
    res.status(400).send(err.message);
  }
});

router.get('/avg/type/subject/:type/:subject', (req, res, next) => {
  try {
    const type = req.params.type;
    const subject = req.params.subject;
    let filteredGrades = [];
    filteredGrades = grades.grades.filter(
      (grade) => grade.type === type && grade.subject === subject
    );
    if (filteredGrades.length === 0)
      throw { message: 'Não foi possivel encontrar notas', subject, type };
    const media = gradesAvg(filteredGrades);
    res.send(`Média das notas: <br> Subject:${subject} <br> Type:${type} <br> 
    Média Arit.: ${media}`);
    logger.info(`GET "/grades/avg/type/subject/${type}/${subject}" - succeed`);
  } catch (err) {
    logger.error(
      `GET "/grades/avg/type/subject/${err.type}/${err.subject}" - ${err.message}`
    );
    res.status(400).send(err.message);
  }
});

router.get('/sum/student/subject/:student/:subject', (req, res, next) => {
  try {
    const student = req.params.student;
    const subject = req.params.subject;
    let totalGradesSum = 0;
    let filteredGrades = [];
    filteredGrades = grades.grades.filter(
      (grade) => grade.student === student && grade.subject === subject
    );
    if (filteredGrades.length === 0)
      throw { message: 'Dados não encontrados', student, subject };
    totalGradesSum = sumGrades(filteredGrades);
    const response = `A soma de notas do subject: ${subject}, <br>
    do Aluno(a): ${student}, é ${totalGradesSum}`;
    res.send(response);
    logger.info(
      `GET "/grades/avg/student/subject/${student}/${subject}" - succeed`
    );
  } catch (err) {
    logger.error(
      `GET "/avg/student/subject/:student/${err.student}/${err.subject}" - ${err.message}`
    );
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let grade = req.body;
    grade = saveGrade(grade);
    utils.writeFile(gradesFilePath, grades);
    res.send(grade);
    logger.info(`POST "/grades" ${grade}" - succeed`);
  } catch (err) {
    res.status(400).send(err);
    logger.error(`POST "/grades" - ${err.message}`);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const gradeIndex = grades.grades.findIndex((grade) => grade.id === id);
    if (gradeIndex < 0) throw { message: 'Nota não encontrado', id };
    let newGrade = req.body;
    newGrade.id = id;
    newGrade = saveGrade(newGrade, gradeIndex);
    utils.writeFile(gradesFilePath, grades);
    res.send(newGrade);
    logger.info(`PUT "/grades/${id}" - ${grade}" - succeed`);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
    logger.error(`PUT "/grades/${err.id}" - ${err.message}`);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const gradeIndex = grades.grades.findIndex((grade) => grade.id === id);
    if (gradeIndex < 0) throw { message: 'Nota não encontrada', id };
    grades.grades.splice(gradeIndex, 1);
    utils.writeFile(gradesFilePath, grades);
    res.send('Nota excluída com sucesso');
    logger.info(`DELETE "/grades/${id}"  - succeed`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`DELETE "/grades/${err.id}"  - ${err.message}`);
  }
});

function get3Best(grades = []) {
  const sortedGrades = grades.sort((a, b) => b.value - a.value);
  const best3 = sortedGrades.splice(0, 3);
  return best3;
}

function gradesAvg(grades = []) {
  const sum = sumGrades(grades);
  const avg = sum / grades.length;
  return avg;
}

function sumGrades(grades = []) {
  const sum = grades.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
  return sum;
}

module.exports = router;
