import {GenericRequestHandler} from './GenericRequestHandler';
import {IRequestHandlerHandleParams} from '../DomioServer/Router';
import {DomainsAdapter} from '../DomioServer/DomainsAdapter';
import {getEndpointByName} from '../Routes';
import {ownedDomainsListFormatter} from '../Formatters/ownedDomainsListFormatter';
const logger = require('tracer').colorConsole();

export default class UserProfileHandler extends GenericRequestHandler {
    public handle(params: IRequestHandlerHandleParams) {
        if (params.isLoggedIn) {
            DomainsAdapter.getOwnedDomains(params.request.state['idToken'], params.request.state['userId'])
                .then((response: any)=> {
                    const domains = response.data.map(ownedDomainsListFormatter);
                    logger.info(domains);

                    const viewParams = this.extendViewParamsWith({
                        pageTitle: 'User profile',
                        isLoggedIn: params.isLoggedIn,
                        domains: domains
                    }, params.request.state);
                    params.reply.view(this.getComponentPageName(), viewParams);
                });
        } else {
            params.reply.redirect(getEndpointByName('UserHome').url);
        }
    }
}
