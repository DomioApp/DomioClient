init();


function init() {
    window['getAppInfo'] = getAppInfo;

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