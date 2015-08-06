/*
 * http-browser.js
 * ---------------
 * Open browser.
 */
'use strict';

var open = require('gulp-open');

/**
 * Task: browser
 *
 * Open default browser and load index.html page.
 */
module.exports = function (gulp) {
    gulp.task('http-browser', function () {
        gulp.src('.tmp/index.html')
            .pipe(open('', global.config.serve.browser));
    });
};
