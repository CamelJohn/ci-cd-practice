import Joi from 'joi';

export const ParserIdParamValidationSchema = Joi.object({
    id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const ParserRequestBodyValidationSchema = Joi.object({
    parser: Joi.object({
        name: Joi.string().required(),
    })
});