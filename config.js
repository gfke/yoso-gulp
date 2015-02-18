'use strict';

var extend = require('extend');

var defaultConfig = {
    folders: {
        source: 'src',
        temp: '.tmp/',
        release: 'app',
        gulpConfig: 'node_modules/yoso-gulp/'
    },
    paths: {
        src: {
            get index() {
                return global.config.folders.source + '/index.html'
            },
            get scripts() {
                return global.config.folders.source + '/**/*.js'
            },
            get tests() {
                return global.config.folders.source + '/**/*.spec.js'
            },
            get styles() {
                return global.config.folders.source + '/styles/**/*.scss'
            },
            get templates() {
                return global.config.folders.source + '/modules/**/*.html'
            }
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
