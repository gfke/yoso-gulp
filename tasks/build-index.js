'use strict';

var gulpif     = require('gulp-if'),
    replace    = require('gulp-replace'),
    minifyHTML = require('gulp-minify-html');

/**
 * This task copies the index.html file from the sources to the app folder
 * and inserts the correct link to the JS and CSS files
 * On ReleaseBuild it also minifies the HTML and adds the cache key to the filename
 */
module.exports = function (gulp) {
    gulp.task('build-index', function () {
        var isRelease = global.config.buildProcess.isReleaseBuild;

        var mainScriptTag      = '<script ' + (global.config.buildProcess.addScriptElementsWithAsync ? 'async' : '') + ' src="' + global.config.filenames.release.scripts + '"></script>',
            scriptKeyInjectTag = '<script type="application/javascript">window.gfke = {cacheKey:"' + global.config.buildProcess.cacheKey + '"}</script>';

        return gulp.src(global.config.paths.source.index)
            // Minify HTML
            .pipe(gulpif(isRelease,
                minifyHTML(global.config.minifyHtml)))
            // Insert link to bundled scripts, either with or without cache key
            //Also expose cache key as global
            .pipe(replace('<!--scripts-->',
                mainScriptTag + scriptKeyInjectTag))
            // Copy to app/temp folder
            .pipe(gulp.dest(gulpif(isRelease,
                global.config.folders.release,
                global.config.folders.temp)));
    });
};
