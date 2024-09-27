import { Controller } from './interface';
import __module__Service from './service';

const __module__Controller: Controller = {
    List: async (_req, res, next) => {
        try {
            const __dto__ = await __module__Service.List();

            res.status(200).json(__dto__);
        } catch (error) {
            next(error);
        }
    },

    GetOne: async (req, res, next) => {
        try {
            const id = req.params.id;

            const __dto__ = await __module__Service.GetOne(id);

            res.status(200).json(__dto__);
        } catch (error) {
            next(error);
        }
    },

    CreateOne: async (req, res, next) => {
        try {
            const __dto__ = await __module__Service.CreateOne(req.body.__dto__);

            res.status(201).json(__dto__);
        } catch (error) {
            next(error);
        }
    },

    UpdateOne: async (req, res, next) => {
        try {
            await __module__Service.UpdateOne(req.params.id, req.body.__dto__);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },

    DeleteOne: async (req, res, next) => {
        try {
            await __module__Service.DeleteOne(req.params.id);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};

export default __module__Controller;
