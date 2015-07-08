'use strict';
var gulp        = require('gulp'),
    runsequence = require('run-sequence');

/**
 * Watch source and tests for changes an run the test instantly
 */
module.exports = gulp.task('watch-unit-test', function (cb) {
    global.config.webpack.test.watch = true;

    runsequence(
        'unit-test',
        cb
    );
});
