import 'utils.dart';

import 'add_domain_page.dart';
import 'login_page.dart';
import 'user_domains_page.dart';

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

        case 'UserDomainsPage':
            page = new UserDomainsPage();
            break;

        default:
            print('Page is not initialized');
            break;
    }
}
