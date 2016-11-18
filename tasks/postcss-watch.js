/**
 * @author    Jan Nahody {@link http://nahody.github.io}
 * @copyright Copyright (c) 2015, Jan Nahody
 * @license   Apache-2.0
 */
'use strict';

var gulp     = require('gulp');

/*
 * Serve the app
 *
 * @return {Stream}
 */
module.exports = function(gulp) {
    gulp.task('postcss-watch', function() {
        gulp.watch(global.config.folders.postcss + '/**/*', ['postcss-styles']);
        gulp.watch(global.config.folders.temp + '/css/**/*', ['http-refresh']);
    });
}