import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";
import {DomainsAdapter} from "../DomioServer/DomainsAdapter";
import {IDomainItem} from "./IDomainItem";

export default class UserDomainRentedSettingsHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams) {
        DomainsAdapter.getByName(params.request.params['domainName'], params.request.state['idToken']).then((domain: IDomainItem) => {

            const viewParams = this.extendViewParamsWith({}, {
                domain: domain.domain,
                id: domain._id,
                isDomainVisible: domain.isVisible,
                isDiscountEnabled: domain.isDiscountEnabled,
                price: domain.price,
                discount: domain.discount,
                discountedPrice: domain.price - (domain.price * (domain.discount / 100)),
                isLoggedIn: params.isLoggedIn,
                domainAEntries: [{value: '192.0.2.235 '}]
            });

            params.reply.view(this.getComponentPageName(), viewParams);
        });
    }
}
