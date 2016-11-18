'use strict';

module.exports = function(gulp) {
    gulp.task('build-develop', ['build-webpack', 'build-index'], function () {
        return true;
    });
}
