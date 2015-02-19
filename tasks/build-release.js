'use strict';
var gulp        = require('gulp'),
    runsequence = require('run-sequence');

module.exports = gulp.task('BuildRelease', ['LintScripts', 'LintStyles', 'UnitTest'], function () {
    global.config.buildProcess.isReleaseBuild = true;
    global.config.buildProcess.cacheKey = new Date().getTime();

    runsequence(
        ['ResolveJsAndCssDependencies','BuildIndex'],
        ['BuildReleaseScripts', 'BuildReleaseStyles']
    );
});
