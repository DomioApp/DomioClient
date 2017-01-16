import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";
import {IDomainItem} from "./IDomainItem";
import {DomainsAdapter} from "../DomioServer/DomainsAdapter";

export default class UserDomainRentHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams) {
        DomainsAdapter.getByName(params.request.params['domainName'], params.request.state['idToken'])
            .then((domain: IDomainItem) => {
                /*                const isMyDomain = params.isLoggedIn ? (params.payload.sub === domain.owner) : false;*/
                /*

                 if (domain.isRented || isMyDomain) {
                 params.reply.redirect(`/domain/${domain.domain}`);
                 }
                 */
                const viewParams = this.extendViewParamsWith({
                    domainName: domain.name,
                    price: domain.price,
                    isLoggedIn: params.isLoggedIn,
                }, params.request.state);
                console.log('#######################################')
                console.log(viewParams)
                console.log('#######################################')

                params.reply.view(this.getComponentPageName(), viewParams);
            });
    };
}
