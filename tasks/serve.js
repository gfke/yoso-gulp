/*
 * serve-watch.js
 * --------------
 * Watch for changes on source and temp folder
 * and file types *.css, *.scss, *.js, *.html, *.json
 */
'use strict';
var gulp   = require('gulp'),
    gutil  = require('gulp-util');

module.exports = gulp.task('serve', ['serve-http'], function () {
    /* Init path on watch for changes */
    var _watchPath = [ global.config.serve.watchFiles.release, global.config.serve.watchFiles.temp ];

    /* Create gulp watcher */
    var _watcher = gulp.watch(_watchPath, ['serve-refresh']);

    /* catch changes on gulp watcher */
    _watcher.on('change', function (event) {
        gutil.log(gutil.colors.green('File ' + event.path + ' was ' + event.type + ', running tasks...'));
    });
});
