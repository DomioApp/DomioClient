import 'dart:html';
import 'api_connector.dart';

initAddDomainPage() {
    print('AddDomainPage initPage');

    var form = querySelector('form') as FormElement;
    form.onSubmit.listen(handleSubmit);
}

handleSubmit(Event event) {
    var form = event.target as FormElement;
    var email = form.querySelector('input[name="name"]') as InputElement;
    print(email.value);

    sendRequest();

    event.preventDefault();
    event.stopPropagation();
}