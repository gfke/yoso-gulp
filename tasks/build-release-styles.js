'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

/**
 * Minify CSS bundle and apply vendor prefixes
 * After that add the cache key to the filename
 * and copy it to the app folder
 */
module.exports = gulp.task('BuildReleaseStyles', function () {
    return gulp.src(global.config.paths.temp.styles)
        .pipe(autoprefixer(global.config.autoPrefixer))
        .pipe(minifyCSS((global.config.minifyCss)))
        .pipe(rename({suffix: '.' + global.config.buildProcess.cacheKey}))
        .pipe(gulp.dest(global.config.folders.release));
});
