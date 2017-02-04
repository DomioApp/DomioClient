import 'dart:html';
import 'api_connector.dart';

initLoginPage() {
    print('LoginPage initPage');

    var form = querySelector('form') as FormElement;
    form.onSubmit.listen(handleSubmit);
}

handleSubmit(Event event) {

    event.preventDefault();
    event.stopPropagation();

    var form = event.target as FormElement;
    var email = form.querySelector('input[name="email"]') as InputElement;
    var password = form.querySelector('input[name="password"]') as InputElement;

    sendRequest(email.value, password.value);
}
