'use strict';

var path    = require('path'),
    gulp    = require('gulp'),
    webpack = require('gulp-webpack-build');

var config          = global.config,
    dest            = config.folders.temp,
    webpackOptions  = config.buildProcess.isReleaseBuild ? config.webpack.release : config.webpack.develop,
    webpackConfig   = {
        useMemoryFs: true,
        progress: true
    },
    CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;

gulp.task('build-webpack', [], function () {
    return gulp.src(path.join(config.folders.gulpConfig, CONFIG_FILENAME))
        .pipe(webpack.configure(webpackConfig))
        .pipe(webpack.overrides(webpackOptions))
        .pipe(webpack.compile())
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(dest));
});
