import {LocalStorage} from './LocalStorage';
import {ApiConnection} from './ApiConnection';
import {HomePage} from "../Pages/HomePage";
import {DomainRentPage} from "../Pages/DomainRentPage";
import {LoginPage} from "../Pages/LoginPage";
const nesClient = require('nes/client').Client;

export class DomioPublic {
    private pageName: string;
    private page: HomePage | DomainRentPage|LoginPage;

    constructor() {
        this.setPage((<HTMLMetaElement>document.head.querySelector('[name=page]')).content);
        this.initPage(this.getPage());
    }

    private initPage(pageName: string) {
        const profile = LocalStorage.getAccessToken();
        if (pageName === 'HomePage') {
            this.subscribeToServerEvents();
            this.page = new HomePage();
        }
        else if (pageName === 'DomainRentPage') {
            this.page = new DomainRentPage({});
        }
        else if (pageName === 'LoginPage') {
            this.page = new LoginPage({});
        }
    }

    public setPage(pageName: string) {
        this.pageName = pageName;
    }

    public getPage() {
        return this.pageName;
    }

    private subscribeToServerEvents() {
        const client = new nesClient('ws://localhost:4000');
        client.connect((err: any) => {
            client.onUpdate = (update: any) => {
                if (update === 'domains_updated') {
                    this.updateDomainsList();
                }
            };
        });
    }

    private updateDomainsList() {
        ApiConnection.getAvailableDomains().then((availableDomains: any) => {
            const availableDomainsList = document.getElementById('available-domains-list');
            let availableDomainsListContent = '';
            availableDomains.forEach((domain: any) => {
                availableDomainsListContent += `<li><a href="">${domain.domain + ' for $' + domain.price + ' per month'}</a></li>`;
            });
            availableDomainsList.innerHTML = availableDomainsListContent;
        });
    }
}

window.addEventListener('load', () => {
    const domioPublic = new DomioPublic();
});
