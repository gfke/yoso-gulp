const path = require('path'),
qs         = require('querystring');

const pathToAppRoot = '../../',
scssVariablesPath = path.join(pathToAppRoot, global.config.folders.scss, '_variables.scs'),
webPackConfig       = {
    context: __dirname,
    entry: path.join(pathToAppRoot, global.config.paths.source.main),
    output: {
        path: path.join(__dirname, pathToAppRoot + config.folders.temp),
        filename: global.config.filenames.release.scripts
    },
    module: {
        loaders: [
            /* {
             test: /\.js$/,
             loader: 'babel'
             }, {
             test: /\.ts$/,
             loader: 'babel!typescript'
             }, {
             test: /\.(jpe?g|png|gif|svg)$/i,
             loaders: [
             'file',
             'image'
             ],
             query: {
             svgoPlugins: [
             {removeTitle: true},
             {convertColors: {shorthex: false}},
             {convertPathData: false}
             ]
             }
             },*/{
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
                    (
                    'sass?' +
                    //TODO: Implement way to inject multiple global sass files like susy
                    'includePaths[]=' + scssVariablesPath +
                    '&' + qs.stringify(global.config.sass)
                    )
                ]
            }
        ]
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    }
};

module.exports = webPackConfig;
