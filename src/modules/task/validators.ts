import { type RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Joi from 'joi';

export function validateUrlParams(schema: Joi.Schema): RequestHandler {
    return (req, _res, next) => {
        try {
            const validationResult = schema.validate(req.params);

            if (!validationResult.error) {
                return next();
            }

            next (new createHttpError.BadRequest(validationResult.error.message));
        } catch (error) {
            next(error);
        }
    };
}

export function validateRequestBody(schema: Joi.Schema): RequestHandler {
    return (req, _res, next) => {
        try {
            const validationResult = schema.validate(req.body);

            if (!validationResult.error) {
                return next();
            }

            next (new createHttpError.BadRequest(validationResult.error.message));
        } catch (error) {
            next(error);
        }
    };
}