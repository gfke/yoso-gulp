/**
 * @author    Jan Nahody {@link http://nahody.github.io}
 * @copyright Copyright (c) 2015, Jan Nahody
 * @license   Apache-2.0
 */
'use strict';

var gulp            = require('gulp'),
    gulpif          = require('gulp-if'),
    postcss         = require('gulp-postcss'),
    cssnext         = require('postcss-cssnext'),
    cssnano         = require('cssnano'),
    postcssImport   = require('postcss-import'),
    discardComments = require('postcss-discard-comments'),
    sorting         = require('postcss-sorting'),
    precss          = require('precss'),
    plumber         = require('gulp-plumber'),
    exportVars      = require('postcss-export-vars');

/*
 * PostCSS definition
 */
var postcss_conf         = [
        postcssImport(),
        cssnext({browsers: ['last 2 versions']}),
        precss(),
        discardComments({removeAll: true}),
        exportVars({file: 'source/colors.es6', match: ['color'], type: 'js'}),
        sorting()
    ],
    postcss_conf_release = [
        postcssImport(),
        cssnext({browsers: ['last 2 versions']}),
        precss(),
        discardComments({removeAll: true}),
        exportVars({file: 'source/colors.es6', match: ['color'], type: 'js'}),
        cssnano(),
        sorting()
    ];

module.exports = function(gulp) {
    gulp.task('postcss-styles', [], function () {
        var isRelease = global.config.buildProcess.isReleaseBuild;

        return gulp.src([global.config.folders.postcss + '/**/*.css', '!' + global.config.folders.postcss + '/**/_*.css'])
            .pipe(plumber())
            .pipe( gulpif(isRelease, postcss(postcss_conf_release), postcss(postcss_conf)) )
            .pipe( gulp.dest( gulpif(isRelease,
                global.config.folders.release + '/css',
                global.config.folders.temp + '/css') ) );
    });
};
