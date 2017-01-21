const path = require('path');
const BabiliPlugin = require("babili-webpack-plugin");

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
    },
    plugins: [
        new BabiliPlugin({})
    ]
};