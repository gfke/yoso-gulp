'use strict';

var gulp         = require('gulp'),
    rename       = require('gulp-rename'),
    minifyCSS    = require('gulp-minify-css');
/**
 * Minify CSS bundle
 * After that add the cache key to the filename
 * and copy it to the app folder
 */
module.exports = gulp.task('build-release-styles', function () {
    return gulp.src(global.config.paths.temp.styles)
        .pipe(minifyCSS((global.config.minifyCss)))
        .pipe(rename(global.config.filenames.release.styles))
        .pipe(gulp.dest(global.config.folders.release));
});
