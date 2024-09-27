import Joi from 'joi';

export const __module__IdParamValidationSchema = Joi.object({
    id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const __module__RequestBodyValidationSchema = Joi.object({
    __dto__: Joi.object({
        name: Joi.string().required(),
    })
});