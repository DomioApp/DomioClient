import {Payments} from './Payments';

export class PaymentForm {
    private formContainer: HTMLFormElement;

    constructor(containerId: string) {
        this.formContainer = <HTMLFormElement> document.getElementById(containerId);
        console.log(this.formContainer)

        this.formContainer.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.formContainer.querySelector('.submit').setAttribute('disabled', 'disabled');

            const amount = parseInt((<HTMLInputElement>document.getElementById('domain-price')).value);
            const domainName = (<HTMLInputElement>document.getElementById('domain-name')).value;

            Payments.perform(domainName, amount).then(() => {
                this.formContainer.querySelector('.submit').removeAttribute('disabled');
                // window.location.href = `/domain/${domainId}/success`
            });

            /*
             Stripe.card.createToken(this.getPaymentState(), (status: number, stripeTokenResponse: StripeTokenResponse) => {
             });
             */
        });
    }

    public getPaymentState() {
        return {
            number: (<HTMLInputElement>this.formContainer.querySelector('#payment-form-cardnumber-input')).value,
            exp_month: parseInt((<HTMLInputElement>this.formContainer.querySelector('#payment-form-expmonth-input')).value),
            exp_year: parseInt((<HTMLInputElement>this.formContainer.querySelector('#payment-form-expyear-input')).value),
            exp: '12/19',
            cvc: '123',
            name: 'John',
            address_line1: 'Home',
            address_line2: 'Home',
            address_city: 'Springfield',
            address_state: 'NY',
            address_zip: '55555',
            address_country: 'USA'
        }
    }
}
