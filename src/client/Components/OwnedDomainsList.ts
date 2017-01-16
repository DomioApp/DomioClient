import {DomainManager} from './DomainManager';

export class OwnedDomainsList {
    private container: HTMLElement;
    private domainsElements: any;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId);
    }

    public update(result: any) {
        if (result.error) {
            return;
        }

        let content: string = '';
        result.domains.forEach((domain: any) => {
            const disabledFlag = domain.isRented ? 'disabled="disabled" title="You cannot remove a domain that is currently rented"' : '';
            content += `<li>
                            <a href="/profile/domain/${domain.domain}/edit">${domain.domain}</a>
                            <span>${domain.isRented ? 'rented' : 'available'}</span>
                            <span>${domain.isVisible ? 'visible' : 'invisible'}</span>
                        </li>`;
        });

        this.container.innerHTML = content;
    }
}
