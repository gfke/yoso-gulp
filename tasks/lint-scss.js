'use strict';

var gulp            = require('gulp'),
    scssLint        = require('gulp-scss-lint'),
    notifyError     = require('../utils/error-notifier');

module.exports = gulp.task('LintScss', function () {
    return gulp.src(global.config.paths.src.styles)
        .pipe(scssLint(global.config.scssLint))
        .on('error', notifyError);
});
