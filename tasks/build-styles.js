'use strict';

var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    sass   = require('gulp-sass'),
    merge  = require('merge-stream');

function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

/**
 * Compiles the application styles and concatenates them with the styles
 * previously build from the dependencies
 */
module.exports = gulp.task('build-styles', ['resolve-js-and-css-dependencies'], function () {
    var appStyles = gulp.src(global.config.paths.source.styles)
        .pipe(sass(global.config.sass).on('error', handleError));

    var dependencyStyles = gulp.src(global.config.paths.temp.styles);

    return merge(appStyles, dependencyStyles)
        .pipe(concat(global.config.filenames.temp.styles))
        .pipe(gulp.dest(config.folders.temp));

});
