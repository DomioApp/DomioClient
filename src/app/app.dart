import 'utils.dart';

import 'add_domain_page.dart';
import 'login_page.dart';

main() {
    var pageName = getPageName();
    var page;

    switch (pageName) {
        case 'LoginPage':
            page = new LoginPage();

            break;
        case 'AddDomainPage':
            page = new AddDomainPage();
            break;
        default:
            print('Page is not initialized');
            break;
    }
}
