import 'dart:html';
import 'api_connector.dart';
import 'page.dart';

class SubscriptionPageModel {
    String name;
    num price_per_month;

    Map toJson() =>
        new Map()
            ..['name'] = name
            ..['price_per_month'] = price_per_month;
}

class SubscriptionPage implements Page {
    ButtonElement deleteSubscriptionButton;
    SubscriptionPageModel model;

    SubscriptionPage() {
        init();
        bindElements();
        bindEvents();
    }

    init() {
        model = new SubscriptionPageModel();
        print(runtimeType);
    }

    bindElements() {
        deleteSubscriptionButton = querySelector('.delete-subscription-button');
    }

    bindEvents() {
        deleteSubscriptionButton.onClick.listen(deleteSubscription);
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

    deleteSubscription(Event event) async {
        event.preventDefault();
        event.stopPropagation();

        ButtonElement button = event.target;

        print(button.value);

        HttpRequest request = await deleteRequest('/subscriptions/${button.value}');

        window.console.log(request.response);

        if (request.readyState == HttpRequest.DONE &&
            (request.status == 200 || request.status == 0)) {
            window.location.assign('/profile/subscriptions');
        }
    }
}