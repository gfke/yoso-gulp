'use strict';

var gulp = require('gulp');

/**
 * Copy source files to app folder.
 *
 * Additional file handling is here possible, like image shrink or others.
 */
module.exports = gulp.task('build-release-copy', function () {
    return gulp.src([
            global.config.folders.source + '/**/*.tmpl.html',
            global.config.folders.static + '/**/*'
        ])
        .pipe(gulp.dest(global.config.folders.release));
});
