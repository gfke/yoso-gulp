'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('jshint-stylish');

/**
 * Runs jsLint on the provided Javascript files
 * Uses a global lint config to evaluate errors
 */
module.exports = gulp.task('LintScripts', function () {
    return gulp.src(global.config.paths.src.scripts)
        .pipe(jshint(global.config.jsLint))
        .pipe(jscs(global.config.jsCs))
        .pipe(jshint.reporter(stylish));
});
