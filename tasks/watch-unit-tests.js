'use strict';
var gulp = require('gulp');

/**
 * Watch source and tests for changes an run the test instantly
 */
module.exports = gulp.task('watch-unit-test', function (cb) {
    gulp.watch(global.config.paths.source.tests, ['unit-test']);
    gulp.watch(global.config.paths.source.scripts, ['unit-test']);
});
