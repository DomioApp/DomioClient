import 'dart:html';
import 'api_connector.dart';
import 'page.dart';

class LoginPageModel {
    String email;
    String password;

    Map toJson() =>
        new Map()
            ..['email'] = email
            ..['password'] = password;

}

class LoginPage implements Page {
    FormElement form;
    EmailInputElement emailInput;
    PasswordInputElement passwordInput;
    LoginPageModel model;

    LoginPage() {
        init();
        bindElements();
        bindEvents();
    }

    init() {
        print(runtimeType);
        model = new LoginPageModel();
    }

    bindElements() {
        form = querySelector('form') as FormElement;
        emailInput = form.querySelector('input[name="email"]');
        passwordInput = form.querySelector('input[name="password"]');
    }

    bindEvents() {
        emailInput.onChange.listen(updateModel);
        passwordInput.onChange.listen(updateModel);

        form.onSubmit.listen(handleSubmit);
    }

    handleSubmit(Event event) async {
        event.preventDefault();
        event.stopPropagation();

        HttpRequest request = await postRequest('/users/login', model);
        window.console.log(request.response);

        if (request.readyState == HttpRequest.DONE &&
            (request.status == 200 || request.status == 0)) {
            var token = new Token.fromJsonString(request.responseText);

            window.localStorage['token'] = token.token;
            window.localStorage['email'] = token.email;

            document.cookie = 'token=${token.token}';
            document.cookie = 'email=${token.email}';


            print(token.id);
        }
    }

    updateModel(Event event) {
        InputElement input = event.target;

        switch (input.name) {
            case 'email':
                model.email = input.value;
                break;
            case 'password':
                model.password = input.value;
                break;
        }
    }
}