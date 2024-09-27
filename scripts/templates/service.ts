import { type Service } from './interface';
import { v4 as uuidv4 } from 'uuid';
import createHttpError from 'http-errors';

class __module__Factory {
    constructor(public dto: any, public id = uuidv4()) {}
}

const __module__Store = new Map<string, any>([]);

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
    CreateOne: (dto: any) => {
        const exists = __module__Store.get(dto.id);

        if (exists) {
            throw new createHttpError.Conflict(`__dto__ with id:${dto.id} already exists`);
        }

        const item = new __module__Factory(dto);

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