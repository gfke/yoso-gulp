'use strict';

/*
 * http-server.js
 * --------------
 * Run http mini server.
 */
var connect      = require('gulp-connect');

module.exports = function(gulp) {
    gulp.task('http-server', function () {
        /* Init path var http server have to serve */
        var connectConfig = global.config.serve.connect || {};

        /* Set root path to serve temporary build files and static files */
        connectConfig.root = [global.config.folders.temp, global.config.folders.static];

        /* Run http server */
        connect.server(connectConfig);
    });
}
