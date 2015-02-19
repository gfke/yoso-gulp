'use strict';

var gulp = require('gulp');
var scssLint = require('gulp-scss-lint');

module.exports = gulp.task('LintScss', function () {
    return gulp.src(global.config.paths.src.styles)
        .pipe(scssLint(global.config.scssLint));
});
