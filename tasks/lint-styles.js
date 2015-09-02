'use strict';

var gulp         = require('gulp'),
    scssLint     = require('gulp-scss-lint');

module.exports = gulp.task('lint-styles', function () {
    return gulp.src(global.config.paths.source.styles)
        .pipe(scssLint(global.config.scssLint));
});
