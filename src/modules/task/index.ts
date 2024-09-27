import express from 'express';
import TaskController from './controller';
import { validators } from './middleware';

const taskRoutes = express.Router();

taskRoutes.get('', TaskController.List);
taskRoutes.get('/:id', validators.urlIdParam, TaskController.GetOne);
taskRoutes.post('', validators.body, TaskController.CreateOne);
taskRoutes.patch('/:id', validators.urlIdParam, validators.body, TaskController.UpdateOne);
taskRoutes.delete('/:id', validators.urlIdParam, TaskController.DeleteOne);

export default taskRoutes;
