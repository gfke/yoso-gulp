'use strict';

var gulp         = require('gulp'),
    scssLint     = require('gulp-scss-lint'),
    notifyErrors = require('../utils/error-notifier');

module.exports = gulp.task('LintStyles', function () {
    return gulp.src(global.config.paths.src.styles)
        .pipe(scssLint(global.config.scssLint))
        .on('error', notifyErrors);
});
