const path = require('path');

module.exports = {
    entry: './src/scripts/app.js',
    output: {
        path: '/usr/local/domio_client/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'es6')
            }
        ]
    }
};