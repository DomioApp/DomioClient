import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";
import {DomainsAdapter} from "../DomioServer/DomainsAdapter";
import {domainsListFormatter} from "../Formatters/domainsListFormatter";

export default class UserDomainsAvailableHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams) {
        const currentPage = parseInt(params.request.params['skipItems']) - 1 || 0;
        const itemsCountPerPage = parseInt(params.request.params['count']) || 10;

        const visiblePagesCount = 5;

        Promise.all([
            DomainsAdapter.getAvailableDomainsCount(),
            DomainsAdapter.getAvailableDomains(currentPage * itemsCountPerPage, itemsCountPerPage)
        ])
            .then((results: any) => {
                const totalDomainsAvailableCount = <number> results[0];
                const pagesCount = Math.ceil(totalDomainsAvailableCount / itemsCountPerPage);

                let startPage = currentPage - visiblePagesCount;
                let endPage = currentPage + visiblePagesCount + 1;

                if (startPage <= 0) {
                    endPage -= (startPage - 1);
                    startPage = 1;
                }
                if (endPage > pagesCount) {
                    endPage = pagesCount;
                }

                const pages: any = [];
                for (let i = startPage; i < endPage; i += 1) {
                    pages.push(i);
                }
                const domainsAvailable = results[1];
                const domainsAvailableWithOwnership = domainsAvailable.map((domain: any) => {
                    const isMyDomain = params.isLoggedIn ? (params.payload.sub === domain.owner) : false;
                    domain.isMyDomain = isMyDomain;
                    return domain;
                });

                const viewParams = this.extendViewParamsWith({
                    pageTitle: 'Domio',
                    domainsAvailable: domainsAvailableWithOwnership.map(domainsListFormatter),
                    totalDomainsAvailableCount: totalDomainsAvailableCount,
                    pages: pages,
                    itemsCountPerPage: itemsCountPerPage,
                    currentPage: currentPage + 2,
                    isLoggedIn: params.isLoggedIn
                });
                params.reply.view(this.getComponentPageName(), viewParams);
            });
    };
}
