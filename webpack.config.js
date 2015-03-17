const path = require('path'),
qs         = require('querystring');

require('./config.js');

const pathToAppRoot = '../../',
webPackConfig       = {
    context: __dirname,
    entry: path.join(pathToAppRoot, global.config.paths.source.main),
    output: {
        //NOTE: There is no output path defined as the result is passed as stream to the gulp.dest task
        filename: global.config.filenames.temp.scripts
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
                    'includePaths[]=' + path.join(pathToAppRoot, global.config.paths.source.styles) +
                    '&' + qs.stringify(global.config.autoPrefixer)
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
