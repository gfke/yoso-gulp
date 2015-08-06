'use strict';
var runsequence = require('run-sequence');

/**
 * Watch source and tests for changes an run the test instantly
 */
module.exports = function (gulp) {
    gulp.task('watch-unit-test', function (cb) {
        global.config.webpack.test.watch = true;

        runsequence(
            'unit-test',
            cb
        );
    })
};
