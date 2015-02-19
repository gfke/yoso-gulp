'use strict';

var gulp       = require('gulp'),
    rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');

/**
 * Minify browserify bundle and templateCache
 * After that add the cache key to the filename
 * and copy it to the app folder
 */
module.exports = gulp.task('BuildReleaseScripts', function () {
    return gulp.src(global.config.paths.temp.scripts)
        .pipe(ngAnnotate())
        .pipe(uglify((global.config.uglify)))
        .pipe(rename({suffix: '.' + global.config.buildProcess.cacheKey}))
        .pipe(gulp.dest(global.config.folders.release));
});