'use strict';
var gulp        = require('gulp'),
    runsequence = require('run-sequence');

module.exports = gulp.task('BuildRelease', ['LintScripts', 'LintScss', 'UnitTest'], function (done) {
    global.config.buildProcess.isReleaseBuild = true;
    global.config.buildProcess.cacheKey = new Date().getTime();

    runsequence(
       'ResolveJsAndCssDependencies',
        ['BuildReleaseScripts', 'BuildReleaseStyles']
    );
});
