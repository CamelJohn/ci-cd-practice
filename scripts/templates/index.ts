import express from 'express';
import __module__Controller from './controller';
import { validators } from './middleware';

const __module__Routes = express.Router();

__module__Routes.get('', __module__Controller.List);
__module__Routes.get('/:id', validators.urlIdParam, __module__Controller.GetOne);
__module__Routes.post('', validators.body, __module__Controller.CreateOne);
__module__Routes.patch('/:id', validators.urlIdParam, validators.body, __module__Controller.UpdateOne);
__module__Routes.delete('/:id', validators.urlIdParam, __module__Controller.DeleteOne);

export default __module__Routes;
