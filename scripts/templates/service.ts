import { Service } from './interface';
import { v4 as uuidv4 } from 'uuid';

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
        return Promise.resolve(item);
    },
    CreateOne: (dto: any) => {
        const item = new __module__Factory(dto);
        __module__Store.set(item.id, item);
        return Promise.resolve(item);
    },
    UpdateOne: (id: string, dto: any) => {
        const item = __module__Store.get(id);
        __module__Store.set(id, { ...item, ...dto });
        return Promise.resolve();
    },
    DeleteOne: (id: string) => {
        __module__Store.delete(id);
        return Promise.resolve();
    },
}

export default __module__Service;