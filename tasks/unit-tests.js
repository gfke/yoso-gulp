'use strict';
var gulp        = require('gulp'),
    babel       = require('gulp-babel'),
    jasmine     = require('gulp-jasmine'),
    runsequence = require('run-sequence');

/**
 * This task runs your unit tests directly in node using jasmine
 * No kharma or phantomJs necessary
 * Compiles sources and test from ES6 to ES5 via babel before running them
 */
module.exports = gulp.task('unit-test', function (cb) {

    gulp.task('build-source-for-tests', function () {
        return gulp.src(global.config.paths.source.scripts)
            .pipe(babel({sourceMaps: false}))
            .pipe(gulp.dest(global.config.folders.tempTests));
    });

    gulp.task('build-tests', function () {
        return gulp.src(global.config.paths.source.tests)
            .pipe(babel({sourceMaps: false}))
            .pipe(gulp.dest(global.config.folders.tempTests));
    });

    gulp.task('run-tests', function () {
        return gulp.src(global.config.paths.temp.tests)
            .pipe(jasmine(global.config.jasmine));
    });

    runsequence(
        'build-source-for-tests',
        'build-tests',
        'run-tests',
        cb
    );

});
