const path = require('path');
const webpack = require('webpack');

const BabiliPlugin = require("babili-webpack-plugin");

const isProd = (process.env.NODE_ENV === 'production');

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
    plugins: getPlugins()
};

function getPlugins() {
    let plugins = [];

    if (isProd) {
        plugins = [
            new BabiliPlugin({})
        ]

    }

    return plugins
}