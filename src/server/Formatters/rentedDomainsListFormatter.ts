// import {Endpoints, getEndpointByName} from '../Routes';
import * as moment from 'moment';

export const rentedDomainsListFormatter = (domain: any) => {
    return {
        domain: domain.domain,
        price: domain.price,
        period: domain.period,
        owner: domain.owner,
        // domainInfoUrl: Request.buildUrl(getEndpointByName('UserDomainInfo').url, {domainName: domain.domain}),
        domainInfoUrl: '/info',
        isMyDomain: domain.isMyDomain,
        rentedHumanDateTime: moment(domain.rentedTimestamp).format('DD MMM, HH:mm'),
        rentedTimestamp: domain.rentedTimestamp
    };
};
