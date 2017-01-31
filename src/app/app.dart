import "utils.dart";
import 'dart:html';
import 'dart:convert';


main() {
    var page = getPageName();
    print(page);
    if (page == 'LoginPage') {
        var form = querySelector('form') as FormElement;
//        label.text = 'Wake up, sleepy head!';
        form.onSubmit.listen(handleSubmit);
    }
}

handleSubmit(Event event) {
    var form = event.target as FormElement;
    var email = form.querySelector('input[name="email"]') as InputElement;
    print(email.value);
    loadData();

    event.preventDefault();
    event.stopPropagation();
}

void loadData() {
    var url = "http://127.0.0.1:8080";

    var request = HttpRequest.getString(url).then(onDataLoaded);
}

void onDataLoaded(String resp) {
    Map decoded = JSON.decode(resp);
    print(decoded['app_version']);
}
