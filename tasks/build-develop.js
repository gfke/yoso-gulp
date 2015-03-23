'use strict';
var gulp = require('gulp');

module.exports = gulp.task('build-develop', ['build-webpack', 'build-index'], function () {
    return true;
});
