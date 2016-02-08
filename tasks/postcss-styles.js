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
    autoprefixer    = require('autoprefixer'),
    postcssImport   = require('postcss-import'),
    discardComments = require('postcss-discard-comments'),
    sorting         = require('postcss-sorting'),
    precss          = require('precss'),
    plumber         = require('gulp-plumber');

/*
 * PostCSS definition
 */
var postcss_conf    = [
    postcssImport(),
    cssnext(),
    precss(),
    discardComments({removeAll: true}),
    autoprefixer({ browsers: ['last 2 versions'] }),
    sorting(),
    cssnano()
];

module.exports = function(gulp) {
    gulp.task('postcss-styles', [], function () {
        var isRelease = global.config.buildProcess.isReleaseBuild;

        return gulp.src([global.config.folders.postcss + '/**/*.css', '!' + global.config.folders.postcss + '/**/_*.css'])
            .pipe(plumber())
            .pipe( postcss(postcss_conf) )
            .pipe( gulp.dest( gulpif(isRelease,
                global.config.folders.release + '/css',
                global.config.folders.temp + '/css') ) );
    });
}
