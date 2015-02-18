'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

/**
 * Runs jsLint on the provided Javascript files
 * Uses a global lint config to evaluate errors
 */
module.exports = gulp.task('lint', function () {
  return gulp.src(global.config.paths.src.scripts)
  .pipe(jshint(global.config.jsLint))
  .pipe(jshint.reporter(stylish));
});
