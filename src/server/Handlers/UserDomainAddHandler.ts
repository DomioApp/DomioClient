import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";
import {getEndpointByName} from "../Routes";

export default class UserDomainAddHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams) {
        const viewParams = this.extendViewParamsWith({isLoggedIn: params.isLoggedIn}, params.request.state);
        params.reply.view(this.getComponentPageName(), viewParams);
    };
}
