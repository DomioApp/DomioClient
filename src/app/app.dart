import "utils.dart";
import 'dart:html';
import 'dart:convert';


main() {
    var page = getPageName();
    print(page);
    if (page == 'LoginPage') {
        var form = querySelector('form') as FormElement;
        form.onSubmit.listen(handleSubmit);
    }
    if (page == 'AddDomainPage') {
        var form = querySelector('form') as FormElement;
        form.onSubmit.listen(handleSubmit);
    }
}


void loadData() {
    var url = "//127.0.0.1:8080";

    var request = HttpRequest.getString(url).then(onDataLoaded);
}

void onDataLoaded(String resp) {
    Map decoded = JSON.decode(resp);
    print(decoded['app_version']);
}
