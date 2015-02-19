'use strict';

var extend = require('extend');

var defaultConfig = {
    folders: {
        source: './source',
        scss: './styles',
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
                return global.config.folders.source + '/**/*.js';
            },
            get main() {
                return global.config.folders.source + '/index.js';
            },
            get tests() {
                return global.config.folders.source + '/**/*.spec.js';
            },
            get styles() {
                return global.config.folders.scss + '/**/*.scss';
            },
            get templates() {
                return global.config.folders.source + '/**/*.html';
            }
        },
        temp: {
            get styles() {
                return global.config.folders.temp + '/index.css';
            },
            get scripts() {
                return global.config.folders.temp + '/index.js';
            }
        },
        release: {
            get styles() {
                return global.config.folders.release + '/index.css';
            },
            get scripts() {
                return global.config.folders.release + '/' + global.config.filenames.release.scripts;
            }
        }
    },
    filenames: {
        release: {
            scripts: 'index.js'
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
    minifyCss: {
        keepBreaks: false
    },
    autoPrefixer: {
        browsers: ['last 2 versions'],
        cascade: false
    },
    buildProcess: {
        useTemplateCache: false,
        isReleaseBuild: false,
        cacheKey: 'dev'
    }
};

//TODO:Necessary? One may just overwrite settings after that
//parts of the config may be defined in the directive gulpfile
//and may overrides every setting
global.config = global.config || {};
global.config = extend(defaultConfig, global.config);
