'use strict';

var jshint       = require('gulp-jshint'),
    jscs         = require('gulp-jscs'),
    stylish      = require('jshint-stylish'),
    notifyErrors = require('../utils/error-notifier');

/**
 * Runs jsLint on the provided Javascript files
 * Uses a global lint config to evaluate errors
 */
module.exports = function (gulp) {
    gulp.task('lint-scripts', function () {
        return gulp.src(global.config.paths.source.scripts)
            .pipe(jshint(global.config.jsLint))
            .pipe(jscs(global.config.jsCs))
            .pipe(jshint.reporter(stylish))
            .on('error', notifyErrors);
    });
};
