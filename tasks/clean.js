'use strict';

var gulp = require('gulp'),
    del  = require('del');

module.exports = gulp.task('Clean', function () {
    return del([
        global.config.folders.temp,
        global.config.folders.app + '/index.*.{js,css,html}'
    ]);
});
