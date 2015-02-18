'use strict';
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

/**
 * This task runs your unit tests directly in node using jasmine
 * No kharma or phantomJs necessary
 */
module.exports = gulp.task('UnitTest', function () {
  return gulp.src(global.config.paths.src.tests)
    .pipe(jasmine(global.config.jasmine));
});
