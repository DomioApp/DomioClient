import {ICommonViewParams, GenericRequestHandler} from "./GenericRequestHandler";
import {IDomainItem} from "./IDomainItem";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";
import {rentedDomainsListFormatter} from "../Formatters/rentedDomainsListFormatter";
import {DomainsAdapter} from "../DomioServer/DomainsAdapter";
import {AvailableDomainsListFormatter} from "../Formatters/AvailableDomainsListFormatter";

export interface IUserHomeHandlerReplyParams extends ICommonViewParams {
    pageTitle: string;
    domainsAvailable: IDomainItem[];
    domainsRented: IDomainItem[];
    totalDomainsAvailableCount: number;
    isLoggedIn: boolean;
}

export default class UserHomeHandler extends GenericRequestHandler {

    public handle(params: IRequestHandlerHandleParams): void {
        Promise
            .all([
                // DomainsAdapter.getAvailableDomainsCount(),
                DomainsAdapter.getAvailableDomains(0, 20),
                // DomainsAdapter.getRecentlyRentedDomains(10)
            ])
            .then((results: any) => {
                const totalDomainsAvailableCount: number = results[0];
                const notRented: IDomainItem[] = results[0].data;
                const recentlyRented: IDomainItem[] = results[2] || [];
                const viewPrms = {
                    pageTitle: 'Domio',
                    domainsAvailable: notRented.map(AvailableDomainsListFormatter),
                    domainsRented: recentlyRented.map(rentedDomainsListFormatter),
                    totalDomainsAvailableCount: totalDomainsAvailableCount,
                    isLoggedIn: params.isLoggedIn
                };
                const viewParams = this.extendViewParamsWith(viewPrms, params.request.state);
                params.reply.view(this.getComponentPageName(), viewParams);
            })
            .catch((err: any) => {
                const viewPrms = {
                    pageTitle: 'Domio',
                    domainsAvailable: <any>[],
                    domainsRented: <any>[],
                    totalDomainsAvailableCount: -1,
                    isLoggedIn: params.isLoggedIn
                };
                const viewParams = this.extendViewParamsWith(viewPrms, params.request.state);
                params.reply.view(this.getComponentPageName(), viewParams);
            });
    };
}
