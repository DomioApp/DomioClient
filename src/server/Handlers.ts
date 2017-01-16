import {IRequestHandlerHandleParams} from './DomioServer/Router';
import UserHomeHandler from "./Handlers/UserHomeHandler";

export interface IEndpointRequestHandler {
    handle(params: IRequestHandlerHandleParams): void;
    validate(params: any): Promise<any>;
}

export enum RequestsTypes {
    User,
    Api
}
export const Handlers: any[] =
    [
        UserHomeHandler
    ];
