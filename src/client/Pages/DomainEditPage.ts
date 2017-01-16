import {Endpoints, getEndpointByName} from '../../server/Routes';
import {DomainManager} from "../Components/DomainManager";

interface IDomainEditPageParams {
    services: {
        domainManager: DomainManager
    };
}

export class DomainEditPage {
    private domainManager: DomainManager;
    private form: HTMLFormElement;
    private domainName: string;
    private deleteButton: HTMLInputElement;
    private discountCheckbox: HTMLInputElement;
    private priceInput: HTMLInputElement;
    private discountInput: HTMLInputElement;
    private discountResultArea: HTMLSpanElement;

    constructor(params: IDomainEditPageParams) {
        this.domainManager = params.services.domainManager;
        this.init();
        this.domainName = this.form.getAttribute('data-name');
    }

    public init(): void {
        this.initForm();
        this.initNameServersInputs();
    }

    private initForm() {
        this.form = <HTMLFormElement> document.getElementById('edit-domain-form');

        this.priceInput = <HTMLInputElement> this.form.querySelector('input#domain-price-input');
        this.priceInput.addEventListener('input', this.updateDiscountResult.bind(this));

        this.deleteButton = <HTMLInputElement> this.form.querySelector('input#delete-domain-button');
        this.deleteButton.addEventListener('click', this.deleteDomain.bind(this));

        this.discountCheckbox = <HTMLInputElement> this.form.querySelector('input#enable-discount-checkbox');
        this.discountCheckbox.addEventListener('change', this.updateDiscountArea.bind(this));

        this.discountInput = <HTMLInputElement> this.form.querySelector('input#domain-discount-input');
        this.discountInput.addEventListener('input', this.updateDiscountResult.bind(this));

        this.discountResultArea = <HTMLSpanElement> this.form.querySelector('span#discount-result-area');

        this.form.addEventListener('submit', this.submitDomainSettings.bind(this));
    }

    private updateDiscountArea(e: Event) {
        e.preventDefault();
        if (this.discountCheckbox.checked) {
            this.discountInput.removeAttribute('disabled');
            this.discountInput.focus();
        } else {
            this.discountInput.setAttribute('disabled', 'disabled');
        }
    }

    private updateDiscountResult(e: Event) {
        e.preventDefault();
        const price = parseInt(this.priceInput.value);
        const discount = parseInt(this.discountInput.value);
        this.discountResultArea.innerText = `$${price - price * (discount / 100)}`;
    }

    private submitDomainSettings(e: Event) {
        e.preventDefault();
        const domainSettings: any = this.getState();
        this.domainManager.updateSettings(this.domainName, domainSettings);
    }

    private deleteDomain(e: Event) {
        e.preventDefault();
        this.domainManager.deleteDomain(this.domainName).then(() => {
            window.location.href = getEndpointByName('UserProfile').url;
        });
    }

    private getState(): any {
        return {
            isVisible: (<HTMLInputElement> this.form.querySelector('#show-domain-checkbox')).checked,
            isDiscountEnabled: (<HTMLInputElement> this.form.querySelector('#enable-discount-checkbox')).checked,
            price: parseInt((<HTMLInputElement> this.form.querySelector('#domain-price-input')).value),
            discount: parseInt((<HTMLInputElement> this.form.querySelector('#domain-discount-input')).value),
            period: parseInt((<HTMLInputElement> this.form.querySelector('#domain-price-period-select')).value),
            tags: (<HTMLInputElement> this.form.querySelector('#domain-tags-input')).value
        };
    }

    private initNameServersInputs() {
        const inputs = this.form.querySelectorAll('#name-servers-list > li');
        (<any>inputs).forEach((listItem: HTMLElement) => {
            const textInput = <HTMLInputElement> listItem.querySelector('input');
            const copyToClipboardButton = <HTMLInputElement> listItem.querySelector('button.copy-to-clipboard-button');

            copyToClipboardButton.addEventListener('click', (e: Event) => {
                textInput.select();
                const val = textInput.value;
                document.execCommand('copy');
                textInput.value = '';
                textInput.value = val;
                copyToClipboardButton.innerHTML = '<i class="material-icons">check</i>';
                copyToClipboardButton.blur();
                setTimeout(() => {
                    copyToClipboardButton.innerHTML = '<i class="material-icons">content_copy</i>';
                }, 3000);
            });
        });
    }
}
