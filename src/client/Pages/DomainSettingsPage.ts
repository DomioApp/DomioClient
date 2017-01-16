import {getEndpointByName} from '../../server/Routes';
import {DomainManager} from "../Components/DomainManager";

interface IDomainSettingsPageParams {
    services: {
        domainManager: DomainManager
    };
}

export class DomainSettingsPage {
    private domainManager: DomainManager;
    private form: HTMLFormElement;
    private domainName: string;
    private deleteButton: HTMLInputElement;

    constructor(params: IDomainSettingsPageParams) {
        this.domainManager = params.services.domainManager;
        this.init();
        this.domainName = this.form.getAttribute('data-domain');
    }

    public init(): void {
        this.initForm();
    }

    private initForm() {
        this.form = <HTMLFormElement> document.getElementById('domain-settings-form');
        this.form.addEventListener('submit', this.updateDomainSettings.bind(this));
    }

    private updateDomainSettings(e: Event) {
        e.preventDefault();
        const domainSettings: any = this.getState();
        this.domainManager.updateRentedDomainSettings(this.domainName, domainSettings);
    }

    private deleteDomain(e: Event) {
        e.preventDefault();
        this.domainManager.deleteDomain(this.domainName).then(() => {
            window.location.href = getEndpointByName('UserProfile').url;
        });
    }

    private getState(): any {
        return {
            domainAEntry: (<HTMLInputElement> this.form.querySelector('.domain-entry-value-input')).value
        };
    }
}
