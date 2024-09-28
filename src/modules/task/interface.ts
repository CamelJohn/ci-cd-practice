import { type RequestHandler } from 'express';
import { type ParamsDictionary } from 'express-serve-static-core';

export interface TaskDto {
    id: string;
    name: string;
}

export interface createTaskDto {
    name: string;
}

export interface TaskRequest {
    task: createTaskDto;
}

export interface TaskRequestWithId extends TaskRequest {
    id: string;
}

export interface TaskWithId extends TaskRequest {
    id: string;
}

export interface TaskResponse {
    name: string;
}

export interface Controller {
    List: RequestHandler;
    GetOne: RequestHandler<ParamsDictionary, TaskResponse, TaskWithId>;
    CreateOne: RequestHandler<ParamsDictionary, TaskResponse, TaskRequestWithId>;
    UpdateOne: RequestHandler<ParamsDictionary, void, TaskRequestWithId>;
    DeleteOne: RequestHandler<ParamsDictionary, void, TaskWithId>;
}

export interface Service<T extends { id: string }> {
    List: () => Promise<T[]>;
    GetOne: (id: string) => Promise<T>;
    CreateOne: (dto: Omit<T, 'id'>) => Promise<T>;
    UpdateOne: (id: string, dto: Omit<T, 'id'>) => Promise<void>;
    DeleteOne: (id: string) => Promise<void>;
}