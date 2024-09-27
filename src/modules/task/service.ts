import { type TaskDto, type createTaskDto, type Service } from './interface';
import { v4 as uuidv4 } from 'uuid';
import createHttpError from 'http-errors';

class TaskFactory {
    constructor(public name: createTaskDto['name'], public id = uuidv4()) {}
}

const TaskStore = new Map<string, TaskDto>([]);

const TaskService: Service<createTaskDto> = {
    List: () => {
        const list = Array.from(TaskStore.values());
        return Promise.resolve(list);
    },
    GetOne: (id: string) => {
        const item = TaskStore.get(id);

        if (!item) {
            throw new createHttpError.NotFound(`task with id:${id} does not exist`);
        }

        return Promise.resolve(item);
    },
    CreateOne: (dto: createTaskDto) => {
        const exists = Array.from(TaskStore.values()).some((item) => item.name === dto.name);

        if (exists) {
            const item = Array.from(TaskStore.entries()).find(([,item]) => item.name === dto.name);
            throw new createHttpError.Conflict(`task with id:${item?.[1].id} already exists`);
        }

        const item = new TaskFactory(dto.name);

        TaskStore.set(item.id, item);

        return Promise.resolve(item);
    },
    UpdateOne: (id: string, dto: createTaskDto) => {
        const item = TaskStore.get(id);

        if (!item) {
            throw new createHttpError.NotFound(`task with id:${id} does not exist`);
        }
        TaskStore.set(id, { ...item, ...dto });
        return Promise.resolve();
    },
    DeleteOne: (id: string) => {
        const item = TaskStore.get(id);

        if (!item) {
            throw new createHttpError.NotFound(`task with id:${id} does not exist`);
        }

        TaskStore.delete(item.id);
        
        return Promise.resolve();
    },
}

export default TaskService;