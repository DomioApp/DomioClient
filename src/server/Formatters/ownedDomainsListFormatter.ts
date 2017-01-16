import {getEndpointByName} from '../Routes';
import {Request} from '../../client/Components/Request';

export const ownedDomainsListFormatter = (domain: any) => {
    return {
        name: domain.name,
        price: domain.price,
        isRented: domain.isRented,
        isVisible: domain.isVisible,
        domainEditUrl: Request.buildUrl(getEndpointByName('UserDomainEdit').url, {name: domain.name})
    };
};
