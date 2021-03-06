'use strict';

var gutil = require('gulp-util');
var extend = require('extend');
var webpack = require('webpack');

module.exports = function(gulp) {
    gulp.task('build-webpack', function (callback) {
        //Need to require this in the task function, else the config would not have been seen on release-build task
        var webpackConfig = require('../webpack.config.js'),
            isTest        = global.config.buildProcess.isTestBuild,
            isRelease     = global.config.buildProcess.isReleaseBuild;

        // modify some webpack config options
        if (isTest) {
            extend(true, webpackConfig, global.config.webpack.test);
        } else if (isRelease) {
            extend(true, webpackConfig, global.config.webpack.release);
        } else {
            extend(true, webpackConfig, global.config.webpack.develop);
        }

        //Add the custom loaders from the app
        webpackConfig.module.loaders = webpackConfig.module.loaders.concat(global.config.webpack.loaders);

        // create a single instance of the compiler to allow caching
        var webPackCompiler   = webpack(webpackConfig),
            initialWatchBuild = true,
            buildHandler      = function (err, stats, isWatchMode) {
                //Handle exceptions during build
                if (err) {
                    throw new gutil.PluginError('build-webpack', err);
                }

                //Handle errors during build only if not in watch mode
                if (stats.hasErrors() && isWatchMode === false) {
                    var errors = stats.toJson({errorDetails: true}).errors;
                    throw new gutil.PluginError('build-webpack', errors.toString());
                }

                gutil.log('[build-webpack]', stats.toString({
                    chunks: false,
                    colors: true
                }));
            };

        if (webpackConfig.watch) {
            // watch webpack
            webPackCompiler.watch(global.config.webpack.watchDelay, function (err, stats) {
                buildHandler(err, stats, true);
                if (initialWatchBuild) {
                    callback();
                } else {
                    //Either refresh the browser or re-run the tests
                    gulp.start(isTest ? 'run-tests' : 'http-refresh');
                }
                initialWatchBuild = false;
            });
        } else {
            // run webpack
            webPackCompiler.run(function (err, stats) {
                buildHandler(err, stats, false);
                callback();
            });
        }

    });
}
