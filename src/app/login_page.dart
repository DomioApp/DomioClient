import 'dart:html';
import 'api_connector.dart';
import 'page.dart';

class LoginPage implements Page {
    FormElement form;

    LoginPage() {
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

        var email = form.querySelector('input[name="email"]') as InputElement;
        var password = form.querySelector(
            'input[name="password"]') as InputElement;

        sendRequest(email.value, password.value);
    }
}