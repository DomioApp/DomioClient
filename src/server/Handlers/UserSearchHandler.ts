import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";
import {IDomainItem} from "./IDomainItem";
import {DomainsAdapter} from "../DomioServer/DomainsAdapter";
import {domainsListFormatter} from "../Formatters/domainsListFormatter";

export default class UserSearchHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams) {
        let filters: any = {};

        if (params.request.query['priceRange']) {
            filters.priceRange = params.request.query['priceRange'];
        }
        if (params.request.query['q']) {
            filters.query = params.request.query['q'];
        }

        DomainsAdapter.find(filters).then((domains: IDomainItem[]) => {
            const viewParams = this.extendViewParamsWith({
                query: params.request.query['q'],
                domainsAvailable: domains.map(domainsListFormatter)
            });
            params.reply.view(this.getComponentPageName(), viewParams);
        });
    };
}
