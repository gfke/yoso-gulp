'use strict';
var gulp        = require('gulp'),
    runsequence = require('run-sequence');

module.exports = gulp.task('develop', ['clean', 'lint-scripts', 'lint-styles'], function () {
    global.config.buildProcess.isReleaseBuild = false;

    runsequence(
        ['unit-test'],
        ['build-develop'],
        'http'
    );
});
