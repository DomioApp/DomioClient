import 'dart:html';
import 'page.dart';
import 'config.dart';
import 'api_connector.dart';

class DomainEditPageModel {
    String name;
    num price_per_month;

    Map toJson() =>
        new Map()
            ..['name'] = name
            ..['price_per_month'] = price_per_month;
}

class DomainEditPage implements Page {
    FormElement form;
    TextInputElement nameInput;
    TextInputElement priceInput;
    DomainEditPageModel model;
    String domainName;

    DomainEditPage() {
        init();
        bindElements();
        bindEvents();
    }

    init() {
        model = new DomainEditPageModel();
        print(runtimeType);
    }

    bindElements() {
        form = querySelector('form');

        HiddenInputElement domainNameInput = form.querySelector('input[name="domain_name"]');
        domainName = domainNameInput.value;

        priceInput = form.querySelector('input[name="price_per_month"]');
    }

    bindEvents() {
        form.onSubmit.listen(handleSubmit);

        priceInput.onChange.listen(updateModel);
    }

    handleSubmit(Event event) async {
        event.preventDefault();
        event.stopPropagation();

        HttpRequest request = await putRequest('/domains/${domainName}', getState());
        window.console.log(request.response);

        if (request.readyState == HttpRequest.DONE &&
            (request.status == 200 || request.status == 0)) {
            print("domain saved");
//            window.location.assign('${siteUrl}/profile/domains');
        }
    }

    updateModel(Event event) {
        InputElement input = event.target;

        switch (input.name) {
            case 'price_per_month':
                model.price_per_month = num.parse(input.value);
                break;
        }
    }

    getState() {
        return {
            'price_per_month': int.parse(priceInput.value),
        };
    }

}