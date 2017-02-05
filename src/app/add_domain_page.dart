import 'dart:html';
import 'api_connector.dart';
import 'page.dart';

class AddDomainPage implements Page {
    FormElement form;

    AddDomainPage() {
        init();
        bindEvents();
    }

    init() {
        form = querySelector('form') as FormElement;
        print(runtimeType);
    }

    bindEvents() {
        form.onSubmit.listen(handleSubmit);
    }

    handleSubmit(Event event) {
        event.preventDefault();
        event.stopPropagation();

        var email = form.querySelector(
            'input[name="name"]') as InputElement;
        print(email.value);

//    sendRequest();
    }

}