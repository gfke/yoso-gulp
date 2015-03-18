var gulp = require('gulp');
var gutil = require('gulp-util');
var extend = require('extend');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');


var isRelease = global.config.buildProcess.isReleaseBuild;

// modify some webpack config options
extend(webpackConfig, isRelease ? global.config.webpack.release : global.config.webpack.develop);

// create a single instance of the compiler to allow caching
var webPackCompiler   = webpack(webpackConfig),
    initialWatchBuild = true,
    buildHandler      = function (err, stats) {
        if (err) {
            throw new gutil.PluginError('build-webpack', err);
        }
        gutil.log('[build-webpack]', stats.toString({
            colors: true
        }));
    };

gulp.task('build-webpack', function (callback) {
    if (isRelease) {
        // run webpack
        webPackCompiler.run(function (err, stats) {
            buildHandler(err, stats);
            callback();
        });
    } else {
        // watch webpack
        var watcher = webPackCompiler.watch(global.config.webpack.watchDelay, function (err, stats) {
            buildHandler(err, stats);
            if (initialWatchBuild) {
                callback();
            } else {
                gulp.start('http-refresh');
            }
            initialWatchBuild = false;
        });
    }

});
