import {DomainManager} from './DomainManager';
import {Request} from './Request';
import {getEndpointByName} from "../../server/Routes";

export class RentedDomainsList {
    private container: HTMLElement;
    private domainsElements: any;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId);
        this.domainsElements = this.container.querySelectorAll('li');
        this.domainsElements.forEach((element: HTMLElement) => {
            element.querySelector('button.remove-domain-button').addEventListener('click', (e: Event) => {
                DomainManager.remove((<HTMLButtonElement> e.target).getAttribute('data-id'));
            });
        });
    }

    public update(result: any) {
        if (result.error) {
            return;
        }

        let content: string = '';
        result.domains.forEach((domain: any) => {
            const domainSettingsLink = Request.buildUrl(getEndpointByName('UserDomainRentedSettings').url, {domainName: domain.domain});
            content += `<li>
                            <a href="${domainSettingsLink}">${domain.domain}</a>
                            <button class="remove-domain-button">Release</button>
                        </li>`;
        });

        this.container.innerHTML = content;
    }
}
