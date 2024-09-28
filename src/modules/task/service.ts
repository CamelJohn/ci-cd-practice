import { type Service } from './interface';
import createHttpError from 'http-errors';
import { PrismaClient, Task } from '@prisma/client';

const client = new PrismaClient();

const TaskService: Service<Task> = {
    List: () => client.task.findMany({}),
    GetOne: async (id: string) => {
        const task = await client.task.findFirst({ where: { id } });

        if (!task) {
            throw new createHttpError.NotFound(`task with id:${id} does not exist`);
        }

        return task;
    },
    CreateOne: async (dto: Omit<Task, 'id'>) => {
        const exists = await client.task.findFirst({ where: { name: dto.name } });

        if (exists) {
            throw new createHttpError.Conflict(`task with id:${exists.id} already exists`);
        }

        const task = await client.task.create({ data: { ...dto } });

        return task;
    },
    UpdateOne: async (id: string, dto: Omit<Task, 'id'>) => {
        await client.task.update({ where: { id }, data: { ...dto } });
        return;
    },
    DeleteOne: async (id: string) => {
        const task = await client.task.findFirst({ where: { id } });

        if (!task) {
            throw new createHttpError.NotFound(`task with id:${id} does not exist`);
        }

        await client.task.delete({ where: { id } });
        
        return;
    },
}

export default TaskService;