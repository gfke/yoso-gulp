'use strict';
var gulp        = require('gulp'),
    runsequence = require('run-sequence');

module.exports = gulp.task('develop', ['clean', 'lint-scripts', 'lint-styles', 'unit-test'], function () {
    global.config.buildProcess.isReleaseBuild = false;

    runsequence(
        ['build-develop'],
        'http'
    );
});
