/*
 * build-release-http.js
 * ---------------------
 * Run http mini server.
 */
'use strict';
var gulp    = require('gulp'),
    connect = require('gulp-connect');

gulp.task('build-release-http', function () {
    /* Init path var http server have to serve */
    var connectConfig = global.config.serve.connect || {};

    /* Set root path to release */
    connectConfig.root = global.config.folders.release;

    /* Run http server */
    connect.server(connectConfig);
});
