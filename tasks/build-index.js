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
module.exports = gulp.task('BuildIndex', function () {
    var isRelease = global.config.buildProcess.isReleaseBuild;

    return gulp.src(config.paths.src.index)
        //Minify HTML
        .pipe(gulpif(isRelease,
            minifyHTML(global.config.minifyHtml)))
        //Insert link to bundled style sheet, either with or without cache key
        .pipe(replace('<!--styles-->',
            '<link href="' + config.filenames.release.styles + '" rel="stylesheet" />'))
        //Insert link to bundled scripts, either with or without cache key
        .pipe(replace('<!--scripts-->',
            '<script async src="' + config.filenames.release.scripts + '"></script>'))
        //copy to app folder
        .pipe(gulp.dest(config.folders.release));
});
