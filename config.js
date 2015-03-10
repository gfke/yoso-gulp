'use strict';

var extend = require('extend');

var defaultConfig = {
    folders: {
        source: './source',
        static: './static',
        scss: './styles',
        temp: './.tmp',
        release: './app',
        gulpConfig: './node_modules/yoso-gulp/'
    },
    paths: {
        source: {
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
                return global.config.folders.temp + '/' + global.config.filenames.temp.styles;
            },
            get scripts() {
                return global.config.folders.temp + '/' + global.config.filenames.temp.scripts;
            },
            get index() {
                return global.config.folders.temp + '/*.html';
            }
        }
    },
    filenames: {
        scss:{
            globalVariables: '_variables.scss',
            globalImports: '_imports.scss'
        },
        temp: {
            styles: 'index.css',
            scripts: 'index.js'
        },
        release: {
            styles: 'index.css',
            scripts: 'index.js'
        }
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
    minifyHtml: {
        comments: true,
        empty: true,
        spare: true,
        quotes: true
    },
    autoPrefixer: {
        browsers: ['last 2 versions'],
        cascade: false
    },
    buildProcess: {
        useTemplateCache: false,
        isReleaseBuild: false,
        cacheKey: 'dev'
    },
    browserify: {
        develop: {
            cache: {},
            packageCache: {},
            fullPaths: true,
            debug: true
        },
        release: {}
    },
    serve: {
        connect: {
            port: 8080,
            livereload: {
                ports: 35729
            }
        },
        watchFiles: {
            get temp() {
                return global.config.folders.temp + '/**/*.{js,css,html}';
            },
            get static() {
                return global.config.folders.release + '/**/*.{js,html,css,svg}';
            },
            get styles() {
                return global.config.folders.scss + '/**/*.{css,scss}';
            }
        },
        browser: {
            url: 'http://localhost:8080'
            //app: 'firefox'
        }
    }
};

//parts of the config may be defined in the directive gulpfile
//and may overrides every setting
global.config = global.config || {};
global.config = extend(defaultConfig, global.config);
