import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";

export default class UserSettingsHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams) {
        params.reply.view(this.getComponentPageName(), this.extendViewParamsWith({}));
    };
}
