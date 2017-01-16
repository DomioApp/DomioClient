import {ApiConnection} from './ApiConnection';
import {TopLevelDomainsList} from './TLD';
import {IDomainAddRequestParams} from "../../server/DomioServer/Requests";

export class DomainManager {
    constructor() {
    }

    public addDomain(params: IDomainAddRequestParams): Promise<any> {
        return ApiConnection.addDomain(params);
    }

    public validateDomain(domainName: string): boolean {
        return TopLevelDomainsList.indexOf(domainName) > -1;
    }

    public getOwnedDomains(): Promise<any> {
        return ApiConnection.getOwnedDomains();
    }

    public static remove(domainName: string): Promise<any> {
        return ApiConnection.deleteDomain(domainName);
    }

    public updateSettings(domainName: string, domainSettings: any): Promise<any> {
        return ApiConnection.updateDomainSettings(domainName, domainSettings);
    }

    public updateRentedDomainSettings(domainName: string, domainSettings: any): Promise<any> {
        return ApiConnection.updateRentedDomainSettings(domainName, domainSettings);
    }

    public deleteDomain(domainName: string) {
        return ApiConnection.deleteDomain(domainName);
    }
}
