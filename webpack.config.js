const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");


const config = {
    context: __dirname + '/app',
    entry: __dirname + '/source/index.js',
    output: {
        path: __dirname + '/app',
        filename: '[chunkhash].js'
    },
    /*plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'source/index.html'
        })
    ],*/
    module: {
        loaders: [
           /* {
                test: /\.js$/,
                loader: 'babel'
            }, {
                test: /\.ts$/,
                loader: 'babel!typescript'
            },*/ {
                test: /\.html$/,
                loader: 'raw'
            }, {
                test: /\.scss$/,
                loaders: [
                    "style",
                    "css",
                    "autoprefixer?browsers=last 2 version",
                    "sass?includePaths[]=" + path.resolve(__dirname, "./source"),
                ]
            }
        ]
    }

};

module.exports = config;
