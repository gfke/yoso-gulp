'use strict';

var gulp = require('gulp');

require('./config');
require('./index');

global.config.paths.src.scripts = ['tasks/**/*.js', '*.js'];
global.config.folders.gulpConfig = '';

gulp.task('default', ['lint']);
