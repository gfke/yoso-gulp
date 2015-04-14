'use strict';
var gulp    = require('gulp'),
    babel   = require('gulp-babel'),
    jasmine = require('gulp-jasmine'),
    del     = require('del');

/**
 * This task runs your unit tests directly in node using jasmine
 * No kharma or phantomJs necessary
 * Compiles sources and test from ES6 to ES5 via babel before running them
 */
module.exports = gulp.task('unit-test', function () {
    gulp.src(global.config.paths.source.scripts)
        .pipe(babel())
        .pipe(gulp.dest(global.config.folders.tempTests));

    gulp.src(global.config.paths.source.tests)
        .pipe(babel())
        .pipe(gulp.dest(global.config.folders.tempTests));

    return gulp.src(global.config.paths.temp.tests)
        .pipe(jasmine(global.config.jasmine));

});
