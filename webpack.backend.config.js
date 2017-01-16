var nodeExternals = require('webpack-node-externals');
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
    target: "node",
    externals: [nodeExternals()],
    entry: {
        server: './src/server/server.ts'
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js',
        libraryTarget: "commonjs"
    },
    exclude: 'node_modules',
    // externals: nodeModules,
    resolve: {
        extensions: ['', '.ts', '.tsx', '.jsx']
    },
    devtool: 'inline-source-map', // Add the loader for .ts files.
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    }
};