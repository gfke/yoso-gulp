const path = require('path'),
qs         = require('querystring');

const pathToAppRoot = '../../',
scssVariablesPath   = path.join(pathToAppRoot, global.config.folders.scss, '_variables.scs'),
webPackConfig       = {
    context: __dirname,
    entry: path.join(pathToAppRoot, global.config.paths.source.main),
    output: {
        path: path.join(__dirname, pathToAppRoot + config.folders.temp),
        filename: global.config.filenames.release.scripts
    },
    module: {
        noParse: [
            /[\/\\]angular\.js$/,
            /[\/\\]angular-ui-router\.js$/,
            /[\/\\]angular-translate\.js$/,
            /[\/\\]TweenMax\.js$/,
        ],
        loaders: [
            {
                test: /\.es6\.js$/,
                loader: 'babel'
            }, {
                test: /\.ts$/,
                loader: 'babel!typescript'
            }, {
                test: /\.(svg)$/,
                loader: 'raw-loader'
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.html$/,
                loader: 'raw'
            }, {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?' + qs.stringify(global.config.autoPrefixer),
                    'sass?' + qs.stringify(global.config.sass)

                ]
            }
        ]
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    }
};

module.exports = webPackConfig;
