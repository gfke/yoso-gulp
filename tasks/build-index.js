'use strict';

var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    replace    = require('gulp-replace'),
    minifyHTML = require('gulp-minify-html');

/**
 * This task copies the index.html file from the sources to the app folder
 * and inserts the correct link to the JS and CSS files
 * On ReleaseBuild it also minifies the HTML
 */
module.exports = gulp.task('build-index', function () {
    var isRelease = global.config.buildProcess.isReleaseBuild;

    return gulp.src(global.config.paths.source.index)
        // Minify HTML
        .pipe(gulpif(isRelease,
            minifyHTML(global.config.minifyHtml)))
        // Insert link to bundled style sheet, either with or without cache key
        .pipe(replace('<!--styles-->',
            '<link href="' + global.config.filenames.release.styles + '" rel="stylesheet">'))
        // Insert link to bundled scripts, either with or without cache key
        .pipe(replace('<!--scripts-->',
            '<script async src="' + global.config.filenames.release.scripts + '"></script>'))
        // Copy to app/temp folder
        .pipe(gulp.dest(gulpif(isRelease,
            global.config.folders.release,
            global.config.folders.temp)));
});
