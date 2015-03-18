var gulp = require('gulp');
var gutil = require('gulp-util');
var extend = require('extend');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');


var isRelease = global.config.buildProcess.isReleaseBuild;

// modify some webpack config options
extend(webpackConfig, isRelease ? global.config.webpack.release : global.config.webpack.develop);

// create a single instance of the compiler to allow caching
var webPackCompiler = webpack(webpackConfig);

gulp.task('webpack-build', function (callback) {
    // run webpack
    webPackCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack-build', err);
        }
        gutil.log('[webpack-build]', stats.toString({
            colors: true
        }));
        callback();
    });
});
