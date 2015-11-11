'use strict';

var rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');

/**
 * Minify webpack bundle and templateCache
 * After that add the cache key to the filename
 * and copy it to the app folder
 */
module.exports = function(gulp) {
    gulp.task('build-release-scripts', function () {
        return gulp.src(global.config.paths.temp.scripts)
            .pipe(ngAnnotate())
            .pipe(uglify((global.config.uglify)))
            .pipe(rename(global.config.filenames.release.scripts))
            .pipe(gulp.dest(global.config.folders.release));
    });
}
