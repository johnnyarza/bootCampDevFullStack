import express from 'express';
import controller from '../controllers/podcastController.js';

const podcastRouter = express();

podcastRouter.post('/', controller.create);
podcastRouter.get('/', controller.findAll);
podcastRouter.get('/:id', controller.findOne);
podcastRouter.put('/', controller.update);
podcastRouter.delete('/:id', controller.remove);

export { podcastRouter };
