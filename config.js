'use strict';

var extend = require('extend');

var defaultConfig = {
    folders: {
        source: './source',
        temp: './.tmp',
        release: './app',
        gulpConfig: './node_modules/yoso-gulp/'
    },
    paths: {
        src: {
            get index() {
                return global.config.folders.source + '/index.html';
            },
            get scripts() {
                return global.config.folders.source + '/modules/**/*.js';
            },
            get main() {
                return global.config.folders.source + '/modules/index.js';
            },
            get tests() {
                return global.config.folders.source + '/**/*.spec.js';
            },
            get styles() {
                return global.config.folders.source + '/styles/**/*.scss';
            },
            get templates() {
                return global.config.folders.source + '/modules/**/*.html';
            }
        },
        temp: {
            get styles() {
                return global.config.folders.temp + '/index.css';
            }
        },
        release: {
            get styles() {
                return global.config.folders.release + '/index.css';
            },
            get scripts() {
                //TODO:Find better solution to creat vinyl source stream in resolve-js-and-css-dependencies.js:90
                return 'bundle.js';
            }
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
    get scssLint() {
        return {
            'config': global.config.folders.gulpConfig + '/scss-lint.yml'
        };
    },
    sass: {
        sourceMap: false
    },
    uglify: {
        mangle: false
    },
    buildProcess: {
        useTemplateCache: false
    }
};

//TODO:Necessary? One may just overwrite settings after that
//parts of the config may be defined in the directive gulpfile
//and may overrides every setting
global.config = global.config || {};
global.config = extend(defaultConfig, global.config);
