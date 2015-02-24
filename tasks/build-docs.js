'use strict';

var gulp   = require('gulp'),
    wicked = require('wicked');

module.exports = gulp.task('build-docs', function (done) {
    wicked({loglevel: 'info'}, ['--configure', __dirname + '/../jsdoc.json'], function () {
        done();
    })
});
