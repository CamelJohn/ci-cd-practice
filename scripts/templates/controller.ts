import { Controller } from './interface';

const __module__Controller: Controller = {
    List: async (_req, res, next) => {
        try {
            res.status(200).json({ message: 'OK' });
        } catch (error) {
            next(error);
        }
    },

    GetOne: async (req, res, next) => {
        try {
            const id = req.params.id;

            res.status(200).json({ message: id });
        } catch (error) {
            next(error);
        }
    },

    CreateOne: async (req, res, next) => {
        try {
            const __dto__ = req.body.__dto__;

            res.status(201).json({ message: __dto__.name });
        } catch (error) {
            next(error);
        }
    },

    UpdateOne: async (req, res, next) => {
        try {
            const __dto__ = req.body.__dto__;

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },

    DeleteOne: async (req, res, next) => {
        try {
            const _id = req.params.id;

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};

export default __module__Controller;
