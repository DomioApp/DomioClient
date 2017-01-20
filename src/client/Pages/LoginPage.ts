export class LoginPage {
    private form: HTMLFormElement;

/*
    constructor(params: any) {
        this.init();
    }

    public init(): void {
        this.initForm();
    }
*/

    private initForm() {
        this.form = <HTMLFormElement> document.querySelector('#login-form');
        this.form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            const state = this.getState();
/*
            LoginManager.login(state).then((authResult: any) => {
                LocalStorage.saveData(authResult.id, authResult.userId);

                // const userProfile = JSON.parse(authResult.user_profile);

                const idTokenCookie = 'idToken=' + authResult.id;
                document.cookie = idTokenCookie;

                const userIdCookie = 'userId=' + authResult.userId;
                document.cookie = userIdCookie;

                /!*
                 const accessTokenCookie = 'accessToken=' + authResult.access_token;
                 document.cookie = accessTokenCookie;
                 *!/

                /!*
                 const emailCookie = 'email=' + userProfile.email;
                 document.cookie = emailCookie;

                 *!/
                // window.location.href = '/';
            })
                .catch((err: any) => {
                    // console.log(err)
                })
            ;
*/
        });
    }

    private getState(): any {
        return {
            email: (<HTMLInputElement> document.getElementById('email-input')).value,
            password: (<HTMLInputElement> document.getElementById('password-input')).value
        };
    }
}
