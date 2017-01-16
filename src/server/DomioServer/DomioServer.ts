import {Router} from './Router';
import {DomioServerConfig} from '../DomioServerConfig';

import * as Nes from 'nes';
import {Server} from 'hapi';
import {DomioLogger} from './DomioLogger';
import {Client} from 'nes';
import {ServerEachSokcetOptions} from 'nes';
import {awskeys} from '../awskey';
import {Request} from 'hapi';
import {IReply} from 'hapi';

export class DomioServer {
    private hapiServer: Server;
    private router: Router;
    private logger: DomioLogger;
    private port: number;

    constructor(port?: number) {
        this.port = port || DomioServerConfig.hapiServer.port;
        this.initEnvironment();
        this.initLogger();
        this.initHapiServer();
        this.registerExtensions();
        this.initNes();
        this.initRouter();
    }

    public start() {
        this.hapiServer.start((err: any) => {
            this.logger.serverLogger().info(`Server running at: ${this.hapiServer.info.uri}`);
            /*
             this.hapiServer.broadcast('welcome!');
             */
        });
    }

    private initHapiServer() {
        this.hapiServer = new Server();
        this.hapiServer.connection({port: this.port});
    }

    private initRouter() {
        this.router = new Router({
            server: this.hapiServer,
            logger: this.logger,
        });

        this.router.initTemplateEngine(this.hapiServer);
        this.router.setRoutes();
    }

    private initNes() {
        this.hapiServer.register(Nes, (err: any) => {
            (<any>this.hapiServer).subscription('/ws/{id}');
        });
    }

    private initLogger() {
        this.logger = new DomioLogger();
        this.logger.init();
    }

    private registerExtensions() {
        /*
         this.hapiServer.ext({
         type: 'onRequest',
         method: function (request: any, reply: any) {
         request.setUrl('/');
         return reply.continue();
         }
         });
         */

        this.hapiServer.ext('onPreResponse', this.setUserNameExt);
        this.hapiServer.ext('onPreResponse', this.extraExt);
    }

    private setUserNameExt(request: Request, reply: IReply) {
        if (request.response.source && request.response.source.context) {
            if (request.state['userId']) {
                request.response.source.context['userId'] = request.state['userId'];
            }
        }
        return reply.continue();
    }

    private extraExt(request: Request, reply: IReply) {
        return reply.continue();
    }

    private initEnvironment() {
        process.env['AWS_ACCESS_KEY_ID'] = awskeys.AWSAccessKeyId;
        process.env['AWS_SECRET_ACCESS_KEY'] = awskeys.AWSSecretKey;
    }
}
