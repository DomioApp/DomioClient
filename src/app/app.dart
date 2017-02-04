import "utils.dart";

import 'add_domain_page.dart';
import 'login_page.dart';

main() {
    var page = getPageName();
    print(page);

    switch (page) {
        case 'LoginPage':
            initLoginPage();

            break;
        case 'AddDomainPage':
            initAddDomainPage();

            break;
    }
}
