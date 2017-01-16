import UserHomeHandler from "./Handlers/UserHomeHandler";

export interface IEndpoint {
    url: string;
    method: Methods;
    isSecure: boolean;
    handler: UserHomeHandler;
    requestParams?: any;
}

export interface IClientEndpoint {
    name: string;
    url: string;
    method: Methods;
    isSecure: boolean;
    requestParams?: any;
}

export interface IRequestParams {
    endpoint: IClientEndpoint;
    urlParams: {
        domainName?: string;
        domainId?: string;
        query?: string;
    };
    payload?: {
        data?: any;
        amount?: number;
        password?: string;
        email?: string;
        token?: string;
        rentalId?: string;
        clientId?: string;
        domainName?: string;
    };
}
export enum Methods {
    Get,
    Post,
    Put,
    Delete,
    Patch
}

export const Endpoints: IClientEndpoint[] = [
    {
        name: 'UserHome',
        url: '/',
        method: Methods.Get,
        isSecure: false
    },
    {
        name: 'UserLogin',
        url: '/login',
        method: Methods.Get,
        isSecure: false
    },
    {
        name: 'UserLogout',
        url: '/logout',
        method: Methods.Get,
        isSecure: false
    },
    {
        name: 'UserDomainsAvailable',
        url: '/domains/{skipItems}/{count}',
        method: Methods.Get,
        isSecure: false
    },
    {
        name: 'UserDomainsByTag',
        url: '/domains/tag/{tag}',
        method: Methods.Get,
        isSecure: false
    },
    {
        name: 'UserDomainsFeatured',
        url: '/domains/featured',
        method: Methods.Get,
        isSecure: false
    },
    {
        name: 'UserProfile',
        url: '/profile',
        method: Methods.Get,
        isSecure: true
    },
    {
        name: 'UserSettings',
        url: '/settings',
        method: Methods.Get,
        isSecure: true
    },
    {
        name: 'UserSearch',
        url: '/search',
        method: Methods.Get,
        isSecure: false
    },
    {
        name: 'UserDomainAdd',
        url: '/domain/addDomain',
        method: Methods.Get,
        isSecure: true
    },
    {
        name: 'UserDomainEdit',
        url: '/edit/{name}',
        method: Methods.Get,
        isSecure: true
    },
    {
        name: 'UserDomainRentedSettings',
        url: '/profile/domain/{domainName}/settings',
        method: Methods.Get,
        isSecure: true
    },
    {
        name: 'UserDomainInfo',
        url: '/domain/{domainName}',
        method: Methods.Get,
        isSecure: false
    },
    {
        name: 'UserDomainRent',
        url: '/rent/{domainName}',
        method: Methods.Get,
        isSecure: true
    },
    {
        name: 'UserDomainRentSuccess',
        url: '/domain/{domainName}/success',
        method: Methods.Get,
        isSecure: true
    },

    {
        name: 'ApiDomainPerformRent',
        url: 'http://api.domio.org/Payments',
        method: Methods.Post,
        isSecure: true
    },
    {
        name: 'ApiSearch',
        url: '/api/search/{domainName}',
        method: Methods.Post,
        isSecure: false
    },
    {
        name: 'ApiDomainAdd',
        url: 'http://api.domio.org/domains',
        method: Methods.Post,
        isSecure: true
    },
    {
        name: 'ApiDomainDelete',
        url: 'http://api.domio.org/domains/{domainName}',
        method: Methods.Delete,
        isSecure: true
    },
    {
        name: 'ApiDomainSettingsUpdate',
        url: 'http://api.domio.org/domains/{domainName}',
        method: Methods.Patch,
        isSecure: true
    },
    {
        name: 'ApiRentedDomainSettingsUpdate',
        url: '/api/domain/rented/{domainName}',
        method: Methods.Put,
        isSecure: true
    },
    {
        name: 'ApiOwnedDomains',
        url: '/api/profile/domains/owned',
        method: Methods.Get,
        isSecure: true
    },
    {
        name: 'ApiRentedDomains',
        url: '/api/profile/domains/rented',
        method: Methods.Get,
        isSecure: true
    },
    {
        name: 'ApiAvailableDomains',
        url: '/api/domains',
        method: Methods.Get,
        isSecure: false
    },
    {
        name: 'ApiLogin',
        url: 'http://api.domio.org/users/login',
        method: Methods.Post,
        isSecure: false
    },
    {
        name: 'ApiDomainAdd',
        url: 'http://api.domio.org/domains',
        method: Methods.Post,
        isSecure: false
    },
    {
        name: 'ApiVerifyJwtToken',
        url: 'http://api.domio.org/verify',
        method: Methods.Post,
        isSecure: false
    },
];

export function getEndpointByName(handlerName: string): IClientEndpoint {

    const result = Endpoints.find((endpoint: IClientEndpoint) => {
        return endpoint.name === handlerName;
    });

    if (!result) {
        // console.error(handlerName);
    }

    return result;
    // Hoek.assert(result, errorMessage)
}
