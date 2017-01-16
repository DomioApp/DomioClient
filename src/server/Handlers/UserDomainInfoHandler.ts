import {DomainsAdapter} from "../DomioServer/DomainsAdapter";
import {GenericRequestHandler} from "./GenericRequestHandler";
import {IRequestHandlerHandleParams} from "../DomioServer/Router";
import {getEndpointByName} from "../Routes";
import {Request} from "../../client/Components/Request";

export default class UserDomainInfoHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams) {
        DomainsAdapter.getByName(params.request.params['domainName'], params.request.state['idToken'])
            .then((domain: any) => {
                if (domain === undefined) {
                    return params.reply.view('notFound').code(404);
                }

                const tagsLinksList = domain.tags.split(',');
                const tagsLinksString = tagsLinksList.map((tag: string) => {
                    const tagStripped = tag.replace(/^\s+/g, '');
                    return `<a href="/domains/tag/${tagStripped}">${tagStripped}</a>`;
                });

                /*
                 const isMyDomain = params.isLoggedIn ? (params.payload.sub === domain.owner) : false;
                 */
                const viewParams = this.extendViewParamsWith({
                    name: domain.name,
                    period: domain.period,
                    price: domain.price,
                    isRented: domain.isRented,
                    rentUrl: Request.buildUrl(getEndpointByName('UserDomainRent').url, {domainName: domain.name}),
                    editUrl: Request.buildUrl(getEndpointByName('UserDomainEdit').url, {domainName: domain.name}),
                    isLoggedIn: params.isLoggedIn,
                    /*
                     isMyDomain: isMyDomain,
                     */
                    tags: tagsLinksString
                }, params.request.state);
                params.reply.view(this.getComponentPageName(), viewParams);
            })
        ;
    };
}
