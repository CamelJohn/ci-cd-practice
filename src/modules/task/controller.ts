import { Controller } from './interface';
import TaskService from './service';

const TaskController: Controller = {
    List: async (_req, res, next) => {
        try {
            const task = await TaskService.List();

            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    },

    GetOne: async (req, res, next) => {
        try {
            const id = req.params.id;

            const task = await TaskService.GetOne(id);

            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    },

    CreateOne: async (req, res, next) => {
        try {
            const task = await TaskService.CreateOne(req.body.task);

            res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    },

    UpdateOne: async (req, res, next) => {
        try {
            await TaskService.UpdateOne(req.params.id, req.body.task);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },

    DeleteOne: async (req, res, next) => {
        try {
            await TaskService.DeleteOne(req.params.id);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};

export default TaskController;
