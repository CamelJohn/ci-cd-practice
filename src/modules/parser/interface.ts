import { type RequestHandler } from 'express';
import { type ParamsDictionary } from 'express-serve-static-core';

export interface ParserDto {
    name: string;
}

export interface ParserRequest {
    parser: ParserDto;
}

export interface ParserRequestWithId extends ParserRequest {
    id: string;
}

export interface ParserWithId extends ParserRequest {
    id: string;
}

export interface ParserResponse {
    message: string;
}

export interface Controller {
    List: RequestHandler;
    GetOne: RequestHandler<ParamsDictionary, ParserResponse, ParserWithId>;
    CreateOne: RequestHandler<ParamsDictionary, ParserResponse, ParserRequestWithId>;
    UpdateOne: RequestHandler<ParamsDictionary, void, ParserRequestWithId>;
    DeleteOne: RequestHandler<ParamsDictionary, void, ParserWithId>;
}
