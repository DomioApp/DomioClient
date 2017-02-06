import 'dart:html';
import 'api_connector.dart';
import 'page.dart';

class UserDomainsPageModel {
    String name;
    num price_per_month;

    Map toJson() =>
        new Map()
            ..['name'] = name
            ..['price_per_month'] = price_per_month;
}

class UserDomainsPage implements Page {
    ElementList<ButtonElement> deleteButtonsList;
    UserDomainsPageModel model;

    UserDomainsPage() {
        init();
        bindElements();
        bindEvents();
    }

    init() {
        model = new UserDomainsPageModel();
        print(runtimeType);
    }

    bindElements() {
        deleteButtonsList = querySelectorAll('.b-delete-domain-button');
    }

    bindEvents() {
        deleteButtonsList.onClick.listen(deleteDomain);
    }

    handleSubmit(Event event) async {
        event.preventDefault();
        event.stopPropagation();

        HttpRequest request = await postRequest('/domains', model);
        window.console.log(request.response);

        if (request.readyState == HttpRequest.DONE &&
            (request.status == 200 || request.status == 0)) {
            print(request.response);
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

    deleteDomain(Event event) async {
        event.preventDefault();
        event.stopPropagation();

        ButtonElement button = event.target;
        print(button.value);

        HttpRequest request = await deleteRequest('/domains/${button.value}');

        window.console.log(request.response);

        if (request.readyState == HttpRequest.DONE &&
            (request.status == 200 || request.status == 0)) {
            print(request.response);
            document.querySelector('div[data-domain="${button.value}"]').remove();
        }
    }
}