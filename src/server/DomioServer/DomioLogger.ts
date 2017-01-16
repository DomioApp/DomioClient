import {DomioServerConfig} from '../DomioServerConfig';
import {transports} from 'winston';
import {addColors} from 'winston';
import * as winston from 'winston';
import {LoggerInstance} from 'winston';

export class DomioLogger {
    private winstonServerLogger: LoggerInstance;
    private winstonPaymentsLogger: LoggerInstance;
    private winstonLoginLogger: LoggerInstance;

    constructor() {
    }

    public init() {
        this.winstonServerLogger = new winston.Logger({
            colorize: true,
            level: 'info',
            transports: [
                new (transports.Console)(),
                new (transports.File)({filename: DomioServerConfig.logsFolder + '/server.log'})
            ]
        });

        this.winstonPaymentsLogger = new winston.Logger({
            colorize: true,
            level: 'info',
            transports: [
                new (transports.File)({filename: DomioServerConfig.logsFolder + '/payments.log'})
            ]
        });

        this.winstonLoginLogger = new winston.Logger({
            colorize: true,
            level: 'info',
            transports: [
                new (transports.Console)(),
                new (transports.File)({filename: DomioServerConfig.logsFolder + '/login.log'})
            ]
        });

        addColors(DomioServerConfig.logger.colors);
    }

    public serverLogger() {
        return this.winstonServerLogger;
    }

    public paymentsLogger() {
        return this.winstonPaymentsLogger;
    }
    public loginLogger() {
        return this.winstonPaymentsLogger;
    }
}
