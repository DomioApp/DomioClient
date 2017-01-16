import {DomainManager} from './DomainManager';
import {DomainEditPage} from "../Pages/DomainEditPage";
import {ProfilePage} from "../Pages/ProfilePage";
import {DomainAddPage} from "../Pages/DomainAddPage";
import {DomainSettingsPage} from "../Pages/DomainSettingsPage";
import {DomainRentPage} from "../Pages/DomainRentPage";

export class DomioUser {
    public domainManager: DomainManager;
    private pageName: string;
    private page: DomainEditPage|ProfilePage|DomainAddPage|DomainSettingsPage|DomainRentPage;

    constructor() {
        this.domainManager = new DomainManager();
        this.setPage((<HTMLMetaElement>document.head.querySelector('[name=page]')).content);
        this.initPage(this.getPage());
    }

    public initPage(pageName: string) {

        if (pageName === 'ProfilePage') {
            this.page = new ProfilePage({
                services: {
                    domainManager: this.domainManager
                }
            });
        }
        else if (pageName === 'DomainEditPage') {
            this.page = new DomainEditPage({
                services: {
                    domainManager: this.domainManager
                }
            });
        }
        else if (pageName === 'DomainSettingsPage') {
            this.page = new DomainSettingsPage({
                services: {
                    domainManager: this.domainManager
                }
            });
        }
        else if (pageName === 'DomainAddPage') {
            this.page = new DomainAddPage({
                services: {
                    domainManager: this.domainManager
                }
            });
        }
        else if (pageName === 'DomainRentPage') {
            this.page = new DomainRentPage({});
        }

    }

    public setPage(pageName: string) {
        this.pageName = pageName;
    }

    public getPage() {
        return this.pageName;
    }
}

window.addEventListener('load', () => {
    const domioUser = new DomioUser();
});
