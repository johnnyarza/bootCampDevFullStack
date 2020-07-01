//const MongoClient = require('mongodb').MongoClient;
import * as mongoDb from 'mongodb';
const MongoClient = mongoDb.default.MongoClient;

const uri =
  'mongodb+srv://johnny:1a2b3c4d5e6f@cluster0.oonph.mongodb.net/<dbname>?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(async (err) => {
  const collection = client.db('grades').collection('students');
  const documents = await collection.find({ subject: 'Portugues' }).toArray();
  console.log(documents);
  // perform actions on the collection object
  client.close();
});
