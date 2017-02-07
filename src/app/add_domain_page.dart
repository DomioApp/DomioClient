import 'dart:html';
import 'page.dart';
import './config.dart';
import 'api_connector.dart';

class AddDomainPageModel {
    String name;
    num price_per_month;

    Map toJson() =>
        new Map()
            ..['name'] = name
            ..['price_per_month'] = price_per_month;
}

class AddDomainPage implements Page {
    FormElement form;
    TextInputElement nameInput;
    TextInputElement priceInput;
    AddDomainPageModel model;

    AddDomainPage() {
        init();
        bindElements();
        bindEvents();
    }

    init() {
        model = new AddDomainPageModel();
        print(runtimeType);
    }

    bindElements() {
        form = querySelector('form');
        nameInput = form.querySelector('input[name="name"]');
        priceInput = form.querySelector('input[name="price_per_month"]');
    }

    bindEvents() {
        form.onSubmit.listen(handleSubmit);

        nameInput.onChange.listen(updateModel);
        priceInput.onChange.listen(updateModel);
    }

    handleSubmit(Event event) async {
        event.preventDefault();
        event.stopPropagation();

        HttpRequest request = await postRequest('/domains', model);
        window.console.log(request.response);

        if (request.readyState == HttpRequest.DONE &&
            (request.status == 200 || request.status == 0)) {
            window.location.assign('${baseUrl}/profile/domains');
        }
    }

    updateModel(Event event) {
        InputElement input = event.target;
        window.console.log(model);

        switch (input.name) {
            case 'name':
                model.name = input.value;
                break;
            case 'price_per_month':
                model.price_per_month = num.parse(input.value);
                break;
        }
    }
}