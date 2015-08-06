/*
 * serve-watch.js
 * --------------
 * Watch for changes on source and temp folder
 * and file types *.css, *.scss, *.js, *.html, *.json
 */
'use strict';
var gutil       = require('gulp-util'),
    runsequence = require('run-sequence');

module.exports = function (gulp) {
    gulp.task('http', ['http-server', 'http-browser'], function () {

        var logFunction = function (event) {
            gutil.log(gutil.colors.green('File ' + event.path + ' was ' + event.type + ', running tasks...'));
        };

        /* Create gulp watcher for static app files*/
        gulp.watch(global.config.serve.watchFiles.static, function () {
            gulp.run('http-refresh');
        }).on('change', logFunction);

        /* Create gulp watcher for the index.html*/
        gulp.watch(global.config.serve.watchFiles.index, function () {
            runsequence(
                'build-index',
                'http-refresh'
            );
        }).on('change', logFunction);

        /* Create gulp watcher for files that need to be compiled in the webpack bundle*/
        /*
         gulp.watch(global.config.serve.watchFiles, ['build-webpack'], function () {
         gulp.run('http-refresh');
         }).on('change', logFunction);
         */
    });
};
