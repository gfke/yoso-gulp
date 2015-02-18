'use strict';

var extend = require('extend');

var defaultConfig = {
    folders: {
        source: 'src',
        release: 'dist',
        temp: 'temp/',
        gulpConfig: 'node_modules/gfk-gulp-config/'
    },
    paths: {
        src: {
            index: '/index.html',
            scripts: '/modules/**/*.js',
            tests: '/**/*.spec.js',
            styles: '/styles/**/*.scss',
            templates: '/modules/**/*.html'
        }
    },
    filenames: {
        temp: {
            get styles() {
                return global.config.folders.temp + 'bundle.css';
            }
        },
        build: {
            styles: 'bundle.css',
            scripts: 'bundle.js'
        },
        release: {
            styles: 'bundle.min.css',
            scripts: 'bundle.min.js'
        }
    },
    ports: {
        staticServer: 8080,
        livereloadServer: 35729
    },
    jasmine: {
        verbose: true,
        includeStackTrace: true
    },
    get jsLint() {
        return global.config.folders.gulpConfig + '.jshintrc';
    },
    get jsCs() {
        return {
            configPath: global.config.folders.gulpConfig + '.jscsrc'
        };
    },
    uglify: {
        mangle: false
    },
    get scssLint() {
        return {
            'config': global.config.folders.gulpConfig + '/scss-lint.yml'
        };
    },
    sass: {
        'sourcemap=none': true
    },
    buildProcess: {
        useTemplateCache: false
    }
};

//TODO:Necessary? One may just overwrite settings after that
//parts of the config may be defined in the directive gulpfile
//and may overrides every setting
global.config = global.config || {};
global.config = extend(true, defaultConfig, global.config);
