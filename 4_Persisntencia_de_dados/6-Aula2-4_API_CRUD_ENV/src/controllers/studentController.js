import studentModel from '../models/studentModel.js';

function findAllStudents() {
  const students = studentModel.find();
  return students;
}

async function postStudent(body) {
  const student = new studentModel(body);
  await student.save();
  return student;
}

async function deleteStudent(id) {
  const field = { _id: id };
  let student = await studentModel.findOne(field);
  if (!student) return student;
  student = await studentModel.findOneAndDelete(field);
  return student;
}

async function updateStudent(id, body) {
  const field = { _id: id };
  let student = await studentModel.findOne(field);
  if (!student) return student;
  student = await studentModel.findOneAndUpdate(field, body, { new: true });
  return student;
}

export { findAllStudents, postStudent, deleteStudent, updateStudent };
