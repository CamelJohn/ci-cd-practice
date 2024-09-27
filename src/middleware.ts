import { type RequestHandler, type ErrorRequestHandler } from 'express';
import createHttpError from 'http-errors';

interface Middleware {
    error_handler: ErrorRequestHandler;
    health_check: RequestHandler;
    catch_all: RequestHandler;
}

const middleware: Middleware = {
    error_handler: (error, _req, res, _next) => {
        if (createHttpError.isHttpError(error)) {
            res.status(error.status).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: error.message });
    },
    health_check: (_req, res, _next) => {
        res.status(200).json({ message: 'OK' });
    },
    catch_all: (_req, _res, next) => next(new createHttpError.NotFound()),
};

export default middleware;