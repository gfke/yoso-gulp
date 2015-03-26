const path = require('path'),
qs         = require('querystring'),
webpack    = require('webpack');

const pathToAppRoot       = '../../',
isRelease                 = global.config.buildProcess.isReleaseBuild,
pathToAppSource           = path.join(__dirname, pathToAppRoot, global.config.folders.source),
pathToTemp                = path.join(__dirname, pathToAppRoot + global.config.folders.temp),
pathToRelease             = path.join(__dirname, pathToAppRoot + global.config.folders.release),
relativePathTempToRelease = path.relative(pathToTemp, pathToRelease),
relativePathToStatic      = path.join(relativePathTempToRelease, global.config.folders.static),
webPackConfig             = {
    context: __dirname,
    entry: path.join(pathToAppRoot, global.config.paths.source.main),
    output: {
        path: pathToTemp,
        filename: global.config.filenames.temp.scripts
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/config.environment.json/, path.join(pathToAppSource, global.config.filenames.config))
    ],
    module: {
        noParse: [
            /[\/\\]angular\.js$/,
            /[\/\\]angular-ui-router\.js$/,
            /[\/\\]angular-translate\.js$/
        ],
        loaders: [
            {
                test: /\.es6\.js$/,
                loader: 'babel'
            },
            {
                test: /\.ts$/,
                loader: 'babel!typescript'
            },
            {
                test: /\.animated\.svg$/,
                loader: 'raw'
            },
            {
                //Do not match animated SVGs
                test: /^(?!.*\.animated\.svg$).*\.svg$/,
                loader: 'relative-file-loader?outputPath=' + (isRelease ? relativePathToStatic : global.config.folders.static)
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
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
