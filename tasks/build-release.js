'use strict';
var gulp        = require('gulp'),
    runsequence = require('run-sequence');
/**
 * Insert the cache key before the extension of the file
 * @param {string} filename
 * @param {string} cacheKey
 * @returns {string}
 */
function insertCacheKey(filename, cacheKey) {
    var tempArray = filename.split('.');
    tempArray.splice(tempArray.length - 1, 0, cacheKey);
    return tempArray.join('.');
}

/**
 * Set all config values necessary for build, create the cache key and update the filenames
 * and call 'BuildStyles', 'BuildIndex' and after that 'BuildReleaseScripts', 'BuildReleaseStyles'
 */
module.exports = gulp.task('build-release', ['clean', 'build-release-clean', 'lint-scripts', 'lint-styles', 'unit-test'], function () {
    var cacheKey = new Date().getTime(),
        scriptFileName = global.config.filenames.release.scripts,
        styleFileName  = global.config.filenames.release.styles;

    scriptFileName = insertCacheKey(scriptFileName, cacheKey);
    styleFileName  = insertCacheKey(styleFileName,  cacheKey);

    global.config.buildProcess.isReleaseBuild = true;
    global.config.buildProcess.cacheKey       = cacheKey;
    global.config.filenames.release.scripts   = scriptFileName;
    global.config.filenames.release.styles    = styleFileName;

    runsequence(
        ['build-styles', 'build-index'],
        ['build-release-scripts', 'build-release-styles'],
        ['build-release-copy']
    );
});
