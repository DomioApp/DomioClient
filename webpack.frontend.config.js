var path = require('path');
var fs = require('fs');

var nodeModules = {};

fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    target: 'web',
    entry: {
        public: './src/client/Components/DomioPublic.ts',
        user: './src/client/Components/DomioUser.ts'
    },
    output: {
        // path: path.join(__dirname, 'build'),
        path: '/usr/local/domio_client',
        filename: 'client.[name].bundle.js'
    },
    externals: nodeModules,
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
        modulesDirectories: ['node_modules']
    },
    devtool: 'inline-source-map', // Add the loader for .ts files.
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    }
};