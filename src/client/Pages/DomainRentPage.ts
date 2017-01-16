import {PaymentForm} from "../Components/PaymentForm";
interface IDomainRentPageParams {
    // services: {
    //     domainManager: DomainManager
    // }
}

export class DomainRentPage {
    // private domainManager: DomainManager;
    private form: HTMLFormElement;
    private rentDomainForm: PaymentForm;

    constructor(params: IDomainRentPageParams) {
        this.init();
    }

    public init(): void {
        this.initForm();
    }

    private initForm() {
        // this.form.addEventListener('submit', this.submitDomainSettings.bind(this));
        // this.form = <HTMLFormElement> document.getElementById('perform-domain-form');
        this.rentDomainForm = new PaymentForm('rent-domain-form');
    }
}
