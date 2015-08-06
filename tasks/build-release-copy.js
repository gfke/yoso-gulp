'use strict';

/**
 * Copy source files to app folder.
 *
 * Additional file handling is here possible, like image shrink or others.
 */
module.exports = function (gulp) {
    gulp.task('build-release-copy', function () {
        return gulp.src([
            global.config.folders.source + '/**/*.tmpl.html',
            global.config.folders.static + '/**/*'
        ])
            .pipe(gulp.dest(global.config.folders.release));
    });
};
