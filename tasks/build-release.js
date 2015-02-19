'use strict';
var gulp = require('gulp');

module.exports = gulp.task('BuildRelease', function () {
    global.config.buildProcess.isReleaseBuild = true;
    global.config.buildProcess.cacheKey = new Date().getTime();
});
