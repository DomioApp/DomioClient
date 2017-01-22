export function getPageName() {
    return document.head.querySelector("[name=page]").content;
}
export function collectFormData(form) {

    const elements = Array.prototype.slice.call(form.elements).reduce((accumulator, el) => {

        if (el.type === 'text' || el.type === 'password') {
            accumulator[el.name] = el.value
        }

        return accumulator;

    }, {});

    return elements;
}