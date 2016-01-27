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
    //styleGuide = require('postcss-style-guide'),
    mixins          = require('postcss-mixins'),
    nested          = require('postcss-nested'),
    conditionals    = require('postcss-conditionals'),
    simpleExtend    = require('postcss-simple-extend'),
    simpleVars      = require('postcss-simple-vars');

/*
 * PostCSS definition
 */
var postcss_conf    = [
    postcssImport(),
    mixins(),
    cssnext(),
    nested(),
    simpleVars(),
    conditionals(),
    simpleExtend(),
    autoprefixer({ browsers: ['last 2 versions'] })
];

module.exports = function(gulp) {
    gulp.task('postcss-styles', [], function () {
        var isRelease = global.config.buildProcess.isReleaseBuild;

        return gulp.src([global.config.folders.postcss + '/**/*.css', '!' + global.config.folders.postcss + '/**/_*.css'])
            .pipe( postcss(postcss_conf) )
            .pipe( gulp.dest( gulpif(isRelease,
                global.config.folders.release + '/css',
                global.config.folders.temp + '/css') ) );
    });
}
