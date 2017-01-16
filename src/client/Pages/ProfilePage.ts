import {DomainManager} from "../Components/DomainManager";
import {OwnedDomainsList} from "../Components/OwnedDomainsList";
import {RentedDomainsList} from "../Components/RentedDomainsList";

interface IProfilePageParams {
    services: {
        domainManager: DomainManager
    };
}

export class ProfilePage {
    private domainManager: DomainManager;
    private ownedDomainsList: OwnedDomainsList;
    private rentedDomainsList: RentedDomainsList;

    constructor(params: IProfilePageParams) {
        this.domainManager = params.services.domainManager;
        this.init();
    }

    public init(): void {
        this.initUserDomainsList();
    }

    public initUserDomainsList() {
        this.ownedDomainsList = new OwnedDomainsList('user-domains-list');
        this.rentedDomainsList = new RentedDomainsList('rented-domains-list');

/*
        ApiConnection.getOwnedDomains().then((domains: IDomainItem[]) => {
            this.ownedDomainsList.update(domains);
        });
*/

/*
        ApiConnection.getRentedDomains().then((domains: IDomainItem[]) => {
            this.rentedDomainsList.update(domains);
        });
*/
    }
}
