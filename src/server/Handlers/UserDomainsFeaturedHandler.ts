import {GenericRequestHandler} from './GenericRequestHandler';
import {IRequestHandlerHandleParams} from '../DomioServer/Router';
import {DomainsAdapter} from '../DomioServer/DomainsAdapter';
import {ownedDomainsListFormatter} from '../Formatters/ownedDomainsListFormatter';

export default class UserDomainsFeaturedHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams) {
        const currentPage = parseInt(params.request.params['skipItems']) || 0;
        const itemsCountPerPage = parseInt(params.request.params['count']) || 10;

        const visiblePagesCount = 5;

        Promise.all([DomainsAdapter.getAvailableDomainsCount(), DomainsAdapter.getFeaturedDomains(currentPage * itemsCountPerPage, itemsCountPerPage)]).then((results: any) => {
            const totalDomainsAvailableCount = results[0];
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

            const viewParams = {
                pageName: 'listingPage',
                scriptFile: 'public',
                pageTitle: 'Domio',
                domainsAvailable: domainsAvailable.map(ownedDomainsListFormatter),
                totalDomainsAvailableCount: totalDomainsAvailableCount,
                pages: pages,
                itemsCountPerPage: itemsCountPerPage,
                currentPage: currentPage + 1,
                userId: params.userId,
                isLoggedIn: params.isLoggedIn
            };
            params.reply.view('listingPage', viewParams);
        });
    };
}
