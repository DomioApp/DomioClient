import {getEndpointByName} from "../Routes";
import {Request} from "../../client/Components/Request";

export const AvailableDomainsListFormatter = (domain: any) => {
    return {
        name: domain.name,
        price: domain.price,
        period: domain.period,
        owner: domain.owner,
        domainInfoUrl: Request.buildUrl(getEndpointByName('UserDomainInfo').url, {domainName: domain.name}),
        isMyDomain: domain.isMyDomain
    };
};
