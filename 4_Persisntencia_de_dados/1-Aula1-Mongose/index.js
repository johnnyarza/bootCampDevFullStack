import mongoose from 'mongoose';

const uri =
  'mongodb+srv://johnny:1a2b3c4d5e6f@cluster0.oonph.mongodb.net/grades?retryWrites=true&w=majority';

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model('student', studentSchema);

const student = mongoose.model('student');

const start = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado');
    await saveDoc();
    await mongoose.connection.close();
    console.log('Conexão encerrada');
  } catch (error) {
    console.log(error);
  }
};

const saveDoc = async () => {
  try {
    await new student({
      name: 'JOhnny',
      subject: 'Matematica',
      type: 'Trabalho Prático',
      value: 22,
    }).save();
    console.log('Documento inserido');
  } catch (error) {
    console.log(error.message);
  }
};

start();
