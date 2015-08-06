'use strict';

var del  = require('del');

/**
 * Clean app folder.
 *
 */
module.exports = function (gulp) {
    gulp.task('build-release-clean', function () {
        return del([global.config.folders.release]);
    });
};
