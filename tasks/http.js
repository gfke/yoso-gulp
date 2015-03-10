/*
 * serve-watch.js
 * --------------
 * Watch for changes on source and temp folder
 * and file types *.css, *.scss, *.js, *.html, *.json
 */
'use strict';
var gulp         = require('gulp'),
    gutil        = require('gulp-util');

module.exports = gulp.task('http', ['http-server', 'http-browser'], function () {
    /* Init path on watch for changes */
    var _watchPath = [ global.config.serve.watchFiles.static, global.config.serve.watchFiles.temp ];

    /* Create gulp watcher */
    var _watcher = gulp.watch(_watchPath, ['http-refresh']);

    gulp.watch(global.config.serve.watchFiles.styles, ['resolve-js-and-css-dependencies']);

    /* catch changes on gulp watcher */
    _watcher.on('change', function (event) {
        gutil.log(gutil.colors.green('File ' + event.path + ' was ' + event.type + ', running tasks...'));
    });
});
