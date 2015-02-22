'use strict';

var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    jscs    = require('gulp-jscs'),
    stylish = require('jshint-stylish');

/**
 * Runs jsLint on the provided Javascript files
 * Uses a global lint config to evaluate errors
 */
module.exports = gulp.task('lint-scripts', function () {
    return gulp.src(global.config.paths.src.scripts)
        .pipe(jshint(global.config.jsLint))
        .pipe(jscs(global.config.jsCs))
        .pipe(jshint.reporter(stylish));
});
