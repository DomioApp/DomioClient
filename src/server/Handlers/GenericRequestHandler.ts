import {IRequestHandlerHandleParams} from '../DomioServer/Router';
import {RequestsTypes} from '../Handlers';
import {Server} from 'hapi';
import {DomioLogger} from '../DomioServer/DomioLogger';
import {Request} from 'hapi';
import {IReply} from 'hapi';
import {getEndpointByName, Methods} from '../Routes';

export interface ICommonViewParams {
    scriptFile: string;
    pageName: string;
}

export abstract class GenericRequestHandler {
    protected server: Server;
    protected logger: DomioLogger;
    protected url: string;
    protected method: string;
    protected scriptName: string = 'user';

    constructor() {
        const endpoint = getEndpointByName(this.getComponentName());
        this.url = endpoint.url;
        // console.log(this.getComponentName())
        this.method = Methods[endpoint.method];
    }

    public getComponentName(): string {
        return (<any>this.constructor).name.replace(/Handler$/, '');
    }

    public getComponentPageName(): string {
        // console.log((<any>this.constructor).name)
        return (<any>this.constructor).name.replace(/User(.+)Handler$/, '$1Page');
    }

    protected reply() {

    }

    /*
     constructor(params: IRouterParams) {
     {
     this.server = params.server;
     this.db = params.db;
     this.r53Adapter = params.r53Adapter;
     this.logger = params.logger;
     }

     }
     */

    public handle(params: IRequestHandlerHandleParams): void {
    }

    public validate(params: any) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    public static getRequestType(): string {
        return RequestsTypes[RequestsTypes.User];
    }

    public getUrl(): string {
        return this.url;
    }

    public getMethod(): string {
        return this.method;
    }

    protected extendViewParamsWith(additionalViewParams: any, state: any): any {

        let commonParams: ICommonViewParams = {
            scriptFile: this.getComponentScriptName(),
            pageName: this.getComponentPageName()
        };

        if (state['email']) {
            additionalViewParams.userId = state['email']
        }
        return Object.assign({}, commonParams, additionalViewParams);
    }

    private getComponentScriptName() {
        return this.scriptName;
    }
}
