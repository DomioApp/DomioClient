import {collectFormData} from './utils'
import {sendApiRequest} from './api_connector'

export function bindLoginPageEvents() {
    const form = document.querySelector('form');

    form.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        const formData = collectFormData(form)
        sendApiRequest('signup', form)
    }
}