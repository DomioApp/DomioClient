export const DomioServerConfig = {
    secret: '40dMOaps1fxv-sh5aD3aXiKQpwFcZUDa9Vmd40DV46U8ZB3FdRZpN0jRPeqVHCqQ',
    folder: 'src',
    logsFolder: 'logs',
    hapiServer: {
        port: 4000
    },
    database: {
        url: 'mongodb://localhost:27017/domio',
        domainsCollectionName: 'domains'
    },
    stripe: {
        token: 'sk_test_83T7gLMq9VQ4YLmWwBylJMS7',
        currency: 'usd'
    },
    domainsRentedCount: 10,
    logger: {
        colors: {
            levels: {
                trace: 0,
                input: 1,
                verbose: 2,
                prompt: 3,
                debug: 4,
                info: 5,
                data: 6,
                help: 7,
                warn: 8,
                error: 9
            },
            colors: {
                trace: 'magenta',
                input: 'grey',
                verbose: 'cyan',
                prompt: 'grey',
                debug: 'blue',
                info: 'green',
                data: 'grey',
                help: 'cyan',
                warn: 'yellow',
                error: 'red'
            }
        }
    },
    Domains: {
        New: {
            isVisible: true
        }
    }
};
