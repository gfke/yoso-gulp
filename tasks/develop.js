'use strict';
var gulp        = require('gulp'),
    runsequence = require('run-sequence');

module.exports = gulp.task('Develop', ['LintScripts', 'LintStyles', 'UnitTest'], function () {
    global.config.buildProcess.isReleaseBuild = false;

    runsequence(
        ['ResolveJsAndCssDependencies','BuildIndex'],
        'serve'
    );
});
