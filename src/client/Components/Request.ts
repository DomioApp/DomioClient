import {LocalStorage} from './LocalStorage';
import {Methods, IRequestParams} from "../../server/Routes";

export class Request {
    private method: Methods;
    private url: string;
    private compiledUrl: string;
    private urlParams: {[key: string]: any};
    private payload: any;

    constructor(params?: IRequestParams) {
        this.method = params.endpoint.method;
        this.url = params.endpoint.url;
        this.urlParams = params.urlParams || {};
        this.compiledUrl = Request.buildUrl(this.url, this.urlParams);
        this.payload = params.payload || undefined;
    }

    public send() {
        const requestPromise = new Promise((resolve, reject) => {
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                resolve(JSON.parse(xhr.response));
            });

            xhr.open((Methods[this.method].toUpperCase()), this.compiledUrl);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Authorization', `${LocalStorage.getIdToken()}`);
            xhr.setRequestHeader('UserId', `${LocalStorage.getUserId()}`);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(this.payload ? JSON.stringify(this.payload) : undefined);
        });
        return requestPromise;
    }

    public static buildUrl(url: string, urlParams: {[key: string]: any}): string {
        let finalUrl = url;
        Object.keys(urlParams).forEach((key) => {
            finalUrl = finalUrl.replace(`{${key}}`, urlParams[key]);
        });

        return finalUrl;
    }
}
