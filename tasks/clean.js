'use strict';

var gulp = require('gulp'),
    del  = require('del');

module.exports = gulp.task('clean', function () {
    return del([
        global.config.folders.temp,
        global.config.paths.release.all
    ]);
});
