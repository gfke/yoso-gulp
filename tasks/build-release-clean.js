'use strict';

var del  = require('del');

module.exports = function(gulp) {
    gulp.task('build-release-clean', function () {
        return del([global.config.folders.release]);
    });
}
