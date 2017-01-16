import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams, Router} from "../DomioServer/Router";
import {IDomainItem} from "./IDomainItem";
import {DomainsAdapter} from "../DomioServer/DomainsAdapter";
const logger = require('tracer').colorConsole();

export default class UserDomainEditHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams) {

        const periods = [
            {value: 1, label: '1 month'},
            {value: 2, label: '2 months'},
            {value: 3, label: '3 months'},
            {value: 4, label: '4 months'},
            {value: 5, label: '5 months'},
            {value: 6, label: '6 months'},
            {value: 12, label: '1 year'},
        ];

        /*
         console.log('=============================================');
         console.log(params.request);
         console.log('=============================================');
         */

        DomainsAdapter.getByName(params.request.params['name'], params.request.state['idToken']).then((response: any) => {


            logger.info(response)

            const domain = response;
            /*
             const isMyDomain = params.isLoggedIn ? (params.payload.sub === domain.owner) : false;
             */
            const viewParams = this.extendViewParamsWith({
                domain: domain.name,
                domainPeriod: domain.period,
                isDomainVisible: domain.isVisible,
                isDiscountEnabled: domain.isDiscountEnabled,
                price: domain.price,
                discount: domain.discount,
                discountedPrice: domain.price - (domain.price * (domain.discount / 100)),
                /*
                 isMyDomain: isMyDomain,
                 */
                isLoggedIn: params.isLoggedIn,
                periods: periods,
                tags: domain.tags,
                // nameServers: this.formatNameServersList(domain.route53Data.DelegationSet.NameServers),
                nameServers: [],
                breadCrumb: Router.createBreadCrumb(domain.name)
            }, params.request.state);

            params.reply.view(this.getComponentPageName(), viewParams);
        })
            .catch((err: any) => {
                logger.error(err)
            });
    }

    public formatNameServersList(nameServers: any) {
        nameServers = nameServers || [];
        return nameServers.map((nameServer: string) => {
            return `<li>
                        <input class="nameserver-input" type="text" readonly="readonly" value="${nameServer}" />
                        <button class="copy-to-clipboard-button" type="button"><i class="material-icons">content_copy</i></button>
                    </li>`;
        });
    }
}
