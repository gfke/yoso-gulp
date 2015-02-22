'use strict';

var gulp = require('gulp'),
    del  = require('del');

/**
 * Clean app folder.
 *
 */
module.exports = gulp.task('build-release-clean', function () {
    return del([global.config.folders.release]);
});
