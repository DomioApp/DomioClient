import "utils.dart";
import 'dart:html';
import 'dart:convert';

handleSubmit(Event event) {
    var form = event.target as FormElement;
    var email = form.querySelector('input[name="email"]') as InputElement;
    print(email.value);
    loadData();

    event.preventDefault();
    event.stopPropagation();
}
