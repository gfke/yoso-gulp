'use strict';

/*
 * http-refresh.js
 * ---------------
 * Send reload signal to browser.
 */
var connect = require('gulp-connect');

module.exports = function(gulp) {
    gulp.task('http-refresh', function () {
        gulp.src(global.config.paths.temp.index)
            .pipe(connect.reload());
    });
}
