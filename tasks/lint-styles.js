'use strict';

var gulp     = require('gulp'),
    scssLint = require('gulp-scss-lint');

module.exports = gulp.task('LintStyles', function () {
    return gulp.src(global.config.paths.src.styles)
        .pipe(scssLint(global.config.scssLint));
});
