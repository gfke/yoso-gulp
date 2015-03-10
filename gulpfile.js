'use strict';

var gulp = require('gulp');

global.config = {
    folders: {
        gulpConfig: ''
    },
    paths: {
        source: {
            get tests() {
                return '';
            },
            get styles() {
                return '';
            },
            get scripts() {
                return [
                    'tasks/**/*.js',
                    '*.js'
                ];
            }
        }
    }
};

require('./config');
require('./index');

gulp.task('default', ['develop']);
