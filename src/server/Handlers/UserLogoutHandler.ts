import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";

export default class UserLogoutHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams): void {

        params.reply.unstate('accessToken');
        params.reply.unstate('idToken');
        params.reply.unstate('userId');

        params.reply.view(this.getComponentPageName());
    };
}
