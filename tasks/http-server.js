/*
 * http-server.js
 * --------------
 * Run http mini server.
 */
'use strict';
var gulp         = require('gulp'),
    connect      = require('gulp-connect');

gulp.task('http-server', function () {
    /* Init path var http server have to serve */
    var connectConfig = global.config.serve.connect || {};

    /* Set root path to serve temporary build files and static files */
    connectConfig.root = [global.config.folders.temp, global.config.folders.static];

    /* Run http server */
    connect.server(connectConfig);
});
