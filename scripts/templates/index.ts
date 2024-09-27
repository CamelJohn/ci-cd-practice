import express from 'express';
import __module__Controller from './controller';
import { validators } from './middleware';

const __dto__Routes = express.Router();

__dto__Routes.get('', __module__Controller.List);
__dto__Routes.get('/:id', validators.urlIdParam, __module__Controller.GetOne);
__dto__Routes.post('', validators.body, __module__Controller.CreateOne);
__dto__Routes.patch('/:id', validators.urlIdParam, validators.body, __module__Controller.UpdateOne);
__dto__Routes.delete('/:id', validators.urlIdParam, __module__Controller.DeleteOne);

export default __dto__Routes;
