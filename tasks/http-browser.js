/*
 * http-browser.js
 * ---------------
 * Open browser.
 */
'use strict';

var gulp    = require('gulp'),
    open    = require('gulp-open');

/**
 * Task: browser
 *
 * Open default browser and load index.html page.
 */
module.exports = gulp.task('http-browser', function () {
    gulp.src('.tmp/index.html')
        .pipe(open('', global.config.serve.browser));
});
