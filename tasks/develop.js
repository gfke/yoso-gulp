'use strict';

module.exports = function(gulp) {
    var runsequence = require('run-sequence').use(gulp);

    gulp.task('develop', ['clean', 'lint-scripts', 'lint-styles'], function () {
        global.config.buildProcess.isReleaseBuild = false;

        runsequence(
            ['unit-test'],
            ['build-develop'],
            'http'
        );
    });
};