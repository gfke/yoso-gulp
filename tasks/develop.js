'use strict';
var runsequence = require('run-sequence');

module.exports = function (gulp) {
    gulp.task('develop', ['clean', 'lint-scripts', 'lint-styles'], function () {
        global.config.buildProcess.isReleaseBuild = false;

        runsequence(
            ['unit-test'],
            ['build-develop'],
            'http'
        );
    });
};
