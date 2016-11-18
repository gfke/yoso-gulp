'use strict';

/**
 * Task: browser
 *
 * Open default browser and load index.html page.
 */

var open    = require('gulp-open');

module.exports = function(gulp) {
    gulp.task('http-browser', function () {
        gulp.src('.tmp/index.html')
            .pipe(open(global.config.serve.browser));
    });
}
