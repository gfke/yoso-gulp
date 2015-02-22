'use strict';
var gulp    = require('gulp'),
    jasmine = require('gulp-jasmine');

/**
 * This task runs your unit tests directly in node using jasmine
 * No kharma or phantomJs necessary
 */
module.exports = gulp.task('unit-test', function () {
    return gulp.src(global.config.paths.source.tests)
        .pipe(jasmine(global.config.jasmine));
});
