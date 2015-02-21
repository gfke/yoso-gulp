/*
 * serve-http.js
 * -------------
 * Run http mini server.
 */
'use strict';
var gulp    = require('gulp'),
    connect = require('gulp-connect');

gulp.task('serve-http', function () {
    /* Init path var http server have to serve */
    var _path = [global.config.folders.release],
        connectConfig = global.config.serve.connect;

    /* On dev mode add temp folder to path */
    if (global.config.buildProcess.isReleaseBuild === false) {
        _path.unshift(global.config.folders.temp);
    }

    connectConfig.root = _path;

    /* Run http server */
    connect.server(connectConfig);
});
