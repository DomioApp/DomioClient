import {bindLoginPageEvents} from './login_page'
import {bindSignupPageEvents} from './signup_page'
import {getPageName} from './utils';
import {getAppInfo} from './app_info';

init();


function init() {
    window.getAppInfo = getAppInfo;

    const page_name = getPageName();

    switch (page_name) {
        case 'LoginPage':
            bindLoginPageEvents();
            break;

        case 'SignupPage':
            bindSignupPageEvents();
            break;
    }
}