import Joi from 'joi';

export const TaskIdParamValidationSchema = Joi.object({
    id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const TaskRequestBodyValidationSchema = Joi.object({
    task: Joi.object({
        name: Joi.string().required(),
    })
});