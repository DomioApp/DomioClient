import {Request} from './Request';
import {getEndpointByName} from "../../server/Routes";
import {IDomainAddRequestParams} from "../../server/DomioServer/Requests";

export class ApiConnection {

    public static getAvailableDomains() {
        return new Request({
            endpoint: getEndpointByName('ApiAvailableDomains'),
            urlParams: undefined
        })
            .send();
    }

    public static getOwnedDomains() {
        return new Request({
            endpoint: getEndpointByName('ApiOwnedDomains'),
            urlParams: undefined
        })
            .send();
    }

    public static getRentedDomains() {
        return new Request({
            endpoint: getEndpointByName('ApiRentedDomains'),
            urlParams: undefined
        })
            .send();
    }

    public static addDomain(params: IDomainAddRequestParams) {
        return new Request({
            endpoint: getEndpointByName('ApiDomainAdd'),
            urlParams: params,
            payload: params
        })
            .send();
    }

    public static deleteDomain(domainName: string) {
        return new Request({
            endpoint: getEndpointByName('ApiDomainDelete'),
            urlParams: {
                domainName: domainName
            }
        })
            .send();
    }

    public static find(query: string) {
        if (query.length === 0) {
            return;
        }
        return new Request({
            endpoint: getEndpointByName('ApiSearch'),
            urlParams: {
                query: query
            }
        })
            .send();
    }

    public static updateDomainSettings(domainName: string, domainSettings: any) {
        return new Request({
            endpoint: getEndpointByName('ApiDomainSettingsUpdate'),
            urlParams: {
                domainName: domainName
            },
            payload: domainSettings
        })
            .send();
    }

    public static updateRentedDomainSettings(domainName: string, domainSettings: any) {
        return new Request({
            endpoint: getEndpointByName('ApiRentedDomainSettingsUpdate'),
            urlParams: {
                domainName: domainName
            },
            payload: domainSettings
        })
            .send();
    }

    public static performPayment(domainName: string, amount: number) {

        return new Request({
            endpoint: getEndpointByName('ApiDomainPerformRent'),
            urlParams: {
                domainName: domainName,
            },
            payload: {
                amount: amount,
                rentalId: '123',
                domainName: domainName
            }
        })
            .send();
    }

    public static login(params: any) {
        return new Request({
            endpoint: getEndpointByName('ApiLogin'),
            urlParams: undefined,
            payload: {
                email: params.email,
                password: params.password
            }
        })
            .send();
    }
}
