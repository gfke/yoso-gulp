/*
 * http-refresh.js
 * ---------------
 * Send reload signal to browser.
 */
'use strict';
var gulp    = require('gulp'),
    connect = require('gulp-connect');

module.exports = gulp.task('http-refresh', function () {
    gulp.src(global.config.paths.temp.index)
        .pipe(connect.reload());
});
