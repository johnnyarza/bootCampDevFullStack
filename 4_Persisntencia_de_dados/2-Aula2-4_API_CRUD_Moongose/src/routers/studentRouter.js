import express from 'express';
import studentModel from '../models/studentModel.js';
import * as studentController from '../controllers/studentController.js';

const studentRouter = express();

studentRouter.get('/', async (req, res) => {
  try {
    const students = await studentController.findAllStudents();
    res.send(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

studentRouter.post('/', async (req, res) => {
  try {
    const student = await studentController.postStudent(req.body);
    res.send(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

studentRouter.delete('/:id', async (req, res) => {
  try {
    const student = await studentController.deleteStudent(req.params.id);
    if (!student) {
      res.status(404).send('Student não encontrado');
      return;
    }
    res.status(200).send('Student deletado');
  } catch (error) {
    res.status(500).send(error);
  }
});

studentRouter.patch('/:id', async (req, res) => {
  try {
    const student = await studentController.updateStudent(
      req.params.id,
      req.body
    );
    if (!student) {
      res.status(404).send('Student não encontrado');
      return;
    }
    res.status(200).send(student);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default studentRouter;
