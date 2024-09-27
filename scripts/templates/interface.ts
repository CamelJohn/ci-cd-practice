import { type RequestHandler } from 'express';
import { type ParamsDictionary } from 'express-serve-static-core';

export interface __module__Dto {
    name: string;
}

export interface __module__Request {
    __dto__: __module__Dto;
}

export interface __module__RequestWithId extends __module__Request {
    id: string;
}

export interface __module__WithId extends __module__Request {
    id: string;
}

export interface __module__Response {
    message: string;
}

export interface Controller {
    List: RequestHandler;
    GetOne: RequestHandler<ParamsDictionary, __module__Response, __module__WithId>;
    CreateOne: RequestHandler<ParamsDictionary, __module__Response, __module__RequestWithId>;
    UpdateOne: RequestHandler<ParamsDictionary, void, __module__RequestWithId>;
    DeleteOne: RequestHandler<ParamsDictionary, void, __module__WithId>;
}

export interface Service<T> {
    List: () => Promise<T[]>;
    GetOne: (id: string) => Promise<T>;
    CreateOne: (dto: __module__Dto) => Promise<T>;
    UpdateOne: (id: string, dto: __module__Dto) => Promise<void>;
    DeleteOne: (id: string) => Promise<void>;
}