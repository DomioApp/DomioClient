import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";

export default class UserLoginHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams): void {
        params.reply.view(this.getComponentPageName(), {pageName: 'LoginPage'});
    };
}
