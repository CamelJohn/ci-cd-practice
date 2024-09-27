import { type __module__Dto, type create__module__Dto, type Service } from './interface';
import { v4 as uuidv4 } from 'uuid';
import createHttpError from 'http-errors';

class __module__Factory {
    constructor(public name: create__module__Dto['name'], public id = uuidv4()) {}
}

const __module__Store = new Map<string, __module__Dto>([]);

const __module__Service: Service<any> = {
    List: () => {
        const list = Array.from(__module__Store.values());
        return Promise.resolve(list);
    },
    GetOne: (id: string) => {
        const item = __module__Store.get(id);

        if (!item) {
            throw new createHttpError.NotFound(`__dto__ with id:${id} does not exist`);
        }

        return Promise.resolve(item);
    },
    CreateOne: (dto: create__module__Dto) => {
        const exists = Array.from(__module__Store.values()).some((item) => item.name === dto.name);

        if (exists) {
            const item = Array.from(__module__Store.entries()).find(([,item]) => item.name === dto.name);
            throw new createHttpError.Conflict(`__dto__ with id:${item?.[1].id} already exists`);
        }

        const item = new __module__Factory(dto.name);

        __module__Store.set(item.id, item);

        return Promise.resolve(item);
    },
    UpdateOne: (id: string, dto: any) => {
        const item = __module__Store.get(id);

        if (!item) {
            throw new createHttpError.NotFound(`__dto__ with id:${id} does not exist`);
        }
        __module__Store.set(id, { ...item, ...dto });
        return Promise.resolve();
    },
    DeleteOne: (id: string) => {
        const item = __module__Store.get(id);

        if (!item) {
            throw new createHttpError.NotFound(`__dto__ with id:${id} does not exist`);
        }

        __module__Store.delete(item.id);
        
        return Promise.resolve();
    },
}

export default __module__Service;