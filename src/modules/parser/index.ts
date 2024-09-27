import express from 'express';
import ParserController from './controller';
import { validators } from './middleware';

const ParserRoutes = express.Router();

ParserRoutes.get('', ParserController.List);
ParserRoutes.get('/:id', validators.urlIdParam, ParserController.GetOne);
ParserRoutes.post('', validators.body, ParserController.CreateOne);
ParserRoutes.patch('/:id', validators.urlIdParam, validators.body, ParserController.UpdateOne);
ParserRoutes.delete('/:id', validators.urlIdParam, ParserController.DeleteOne);

export default ParserRoutes;
