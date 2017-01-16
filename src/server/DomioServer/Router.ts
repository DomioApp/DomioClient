import {Methods} from '../Routes';
const inert = require('inert');
const vision = require('vision');
const Hoek = require('hoek');

import * as pug from 'pug';
import {DomioServerConfig} from '../DomioServerConfig';
import merge = require('lodash/merge');
import {Request} from 'hapi';
import {IReply} from 'hapi';
import {Server} from 'hapi';
import {DomioLogger} from './DomioLogger';
import isEqual = require('lodash/isEqual');
import difference = require('lodash/difference');
import UserHomeHandler from "../Handlers/UserHomeHandler";
import UserDomainInfoHandler from "../Handlers/UserDomainInfoHandler";
import UserProfileHandler from "../Handlers/UserProfileHandler";
import {GenericRequestHandler} from "../Handlers/GenericRequestHandler";
import UserLoginHandler from "../Handlers/UserLoginHandler";
import {LoginManager} from "../../client/Components/LoginManager";
import AuthManager from "./AuthManager";
import UserLogoutHandler from "../Handlers/UserLogoutHandler";
import UserDomainAddHandler from "../Handlers/UserDomainAddHandler";
import UserDomainEditHandler from "../Handlers/UserDomainEditHandler";
import UserDomainRentHandler from "../Handlers/UserDomainRentHandler";

const logger = require('tracer').colorConsole();

export interface IRequestHandlerParams {
    method: Methods;
    url: string;
}
export interface IRequestHandlerHandleParams {
    request: Request;
    reply: IReply;

    server: Server;
    logger: DomioLogger;

    payload?: any;
    userId: string;
    isLoggedIn: boolean;
}
export interface IRouterParams {
    server: Server;
    logger: DomioLogger;
}
export class Router {
    private server: Server;
    private logger: DomioLogger;

    constructor(params: IRouterParams) {
        this.server = params.server;
        this.logger = params.logger;
    }

    public setRoutes() {
        const userHomeHandler = new UserHomeHandler();
        const userLoginHandler = new UserLoginHandler();
        const userLogoutHandler = new UserLogoutHandler();
        const userDomainInfoHandler = new UserDomainInfoHandler();
        const userProfileHandler = new UserProfileHandler();
        const userDomainAddHandler = new UserDomainAddHandler();
        const userDomainEditHandler = new UserDomainEditHandler();
        const userDomainRentHandler = new UserDomainRentHandler();

        this.setRoute(userHomeHandler);
        this.setRoute(userLoginHandler);
        this.setRoute(userLogoutHandler);
        this.setRoute(userDomainInfoHandler);
        this.setRoute(userProfileHandler);
        this.setRoute(userDomainAddHandler);
        this.setRoute(userDomainEditHandler);
        this.setRoute(userDomainRentHandler);
    }

    public setRoute(handler: GenericRequestHandler) {
        this.server.route({
            method: handler.getMethod(),
            path: handler.getUrl(),
            handler: (request: Request, reply: IReply) => {

                const commonParams = {
                    server: this.server,
                    logger: this.logger,
                };

                AuthManager.authenticate(request.state['idToken'], request.state['userId'])
                    .then((payload: any) => {

                        const params = Object.assign(commonParams,
                            {
                                request: request,
                                reply: reply,
                                isLoggedIn: true,
                            });

                        handler.handle(params);
                    })
                    .catch((err: any) => {
                        handler.handle(Object.assign(commonParams,
                            {
                                request: request,
                                reply: reply,
                                isLoggedIn: false
                            }));
                    });
            }
        });
    }

    public initTemplateEngine(server: any) {
        server.register(vision, (err: any) => {
            Hoek.assert(!err, err);
            server.views({
                engines: {
                    pug: pug
                },
                relativeTo: DomioServerConfig.folder,
                path: 'templates/pages'
            });
        });
    };

    public static createBreadCrumb(domainName: string) {
        const separator = '<i class="separator">⟶</i>';
        return [
            '<a href="/">Domains</a>', separator,
            '<a href="/profile">Profile</a>', separator,
            '<a>Edit domain</a>', separator,
            `<span class="current-page-label">${domainName}</span>`
        ].join('');
    }
}
