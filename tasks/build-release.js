'use strict';
var gulp        = require('gulp'),
    runsequence = require('run-sequence');


function insertCacheKey(filename, cacheKey) {
    var tempArray = filename.split('.');
    tempArray.splice(tempArray.length - 1, 0, cacheKey);
    return tempArray.join('.');
}

module.exports = gulp.task('BuildRelease', ['Clean', 'LintScripts', 'LintStyles', 'UnitTest'], function () {
    var cacheKey = new Date().getTime(),
        scriptFileName = global.config.filenames.release.scripts,
        styleFileName = global.config.filenames.release.styles;

    scriptFileName = insertCacheKey(scriptFileName, cacheKey);
    styleFileName = insertCacheKey(styleFileName, cacheKey);

    global.config.buildProcess.isReleaseBuild = true;
    global.config.buildProcess.cacheKey = cacheKey;
    global.config.filenames.release.scripts = scriptFileName;
    global.config.filenames.release.styles = styleFileName;

    runsequence(
        ['ResolveJsAndCssDependencies', 'BuildIndex'],
        ['BuildReleaseScripts', 'BuildReleaseStyles']
    );
});
