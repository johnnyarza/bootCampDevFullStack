import mongoose from 'mongoose';
import podcastModel from './podcastModel.js';

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb://localhost:27017/test';
db.podcast = podcastModel(mongoose);

export default db;
