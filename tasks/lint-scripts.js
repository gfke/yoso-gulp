'use strict';

var gulp         = require('gulp'),
    eslint       = require('gulp-eslint'),
    jscs         = require('gulp-jscs'),
    notifyErrors = require('../utils/error-notifier');

/**
 * Runs eslint and jscs on the provided Javascript files
 * Uses a global lint config to evaluate errors
 */
module.exports = gulp.task('lint-scripts', function () {
    return gulp.src(global.config.paths.source.scripts)
        .pipe(eslint(global.config.esLint))
        .pipe(jscs(global.config.jsCs))
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .on('error', notifyErrors);
});
