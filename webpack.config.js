    var path = require('path');
    module.exports = {
        entry: './src/scripts/login_page.js',
        output: {
            path: __dirname,
            filename: '/usr/local/domio_client/bundle.js'
        },
        module: {
            loaders: [
                { test: path.join(__dirname, 'es6'),
                  loader: 'babel-loader' }
            ]
        }
    };