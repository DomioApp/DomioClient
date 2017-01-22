import {bindLoginPageEvents} from './login_page'
import {getPageName} from './utils';

init();


function init() {
    const page_name = getPageName();

    switch (page_name) {
        case 'LoginPage':
            bindLoginPageEvents();
            break;
    }

    console.log(`Page name: ${page_name}`);

}