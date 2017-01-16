import {getEndpointByName} from '../../server/Routes';
import {IDomainAddRequestParams} from '../../server/DomioServer/Requests';
import {DomainManager} from "../Components/DomainManager";
import {Request} from "../Components/Request";

interface IDomainAddPageParams {
    services: {
        domainManager: DomainManager
    };
}

export class DomainAddPage {
    private domainManager: DomainManager;
    private form: HTMLFormElement;

    constructor(params: IDomainAddPageParams) {
        this.domainManager = params.services.domainManager;
        this.init();
    }

    public init(): void {
        this.initForm();
    }

    private initForm() {
        this.form = <HTMLFormElement> document.querySelector('#add-domain-form');
        this.form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            const state = this.getState();
            this.domainManager.addDomain(state).then(() => {
                window.location.href = Request.buildUrl(getEndpointByName('UserDomainEdit').url, state);
            });
        });
    }

    private getState(): IDomainAddRequestParams {
        return {
            price: parseInt((<HTMLInputElement> document.getElementById('domain-price-input')).value),
            name: (<HTMLInputElement> document.getElementById('domain-name-input')).value,
            isFeatured: false,
            tags: (<HTMLInputElement> document.getElementById('domain-tags-input')).value
        };
    }
}
