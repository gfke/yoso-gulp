'use strict';

var gulp = require('gulp');

var matchNoting = 'a^';
global.config = {
    folders: {
        gulpConfig: '',
        source: './'
    },
    filenames: {
        patterns: {
            scripts: '{/tasks/*.js,utils/*.js,*.js}',
            styles: matchNoting,
            tests: matchNoting,
            templates: matchNoting
        }
    }
};

require('./config');
require('./index');
gulp.task('default', ['develop']);
