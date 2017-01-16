import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";
import {IDomainItem} from "./IDomainItem";
import {DomainsAdapter} from "../DomioServer/DomainsAdapter";

export default class UserDomainRentSuccessHandler extends GenericRequestHandler {
    public  handle(params: IRequestHandlerHandleParams) {
        DomainsAdapter.getByName(params.request.params['domainName'], params.request.state['idToken'])
            .then((domain: IDomainItem) => {
                const viewParams = this.extendViewParamsWith({}, {
                    domain: domain.domain,
                    price: domain.price,
                    isRented: domain.isRented
                });
                params.reply.view(this.getComponentPageName(), viewParams);
            });
    }
}
