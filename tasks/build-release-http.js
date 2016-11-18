'use strict';

/*
 * build-release-http.js
 * ---------------------
 * Run http mini server.
 */

var connect = require('gulp-connect');

module.exports = function(gulp) {
    gulp.task('build-release-http', function () {
        /* Init path var http server have to serve */
        var connectConfig = global.config.serve.connect || {};

        /* Set root path to release */
        connectConfig.root = global.config.folders.release;

        /* Run http server */
        connect.server(connectConfig);
    });
}
