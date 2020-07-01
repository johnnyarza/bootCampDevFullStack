import express from 'express';
import db from './src/models/index.js';
import { podcastRouter } from './src/routers/podcastRouter.js';

const app = express();

app.use(express.json());
app.use('/podcast', podcastRouter);

app.listen(3003, async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected with DB');
    console.log('API started');
  } catch (error) {}
});
