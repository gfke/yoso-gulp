'use strict';

var extend = require('extend');

var defaultConfig = {
    folders: {
        source: './source',
        static: './static',
        postcss: './postcss',
        temp: './.tmp',
        release: './app',
        gulpConfig: './node_modules/yoso-gulp/'
    },
    paths: {
        source: {
            a: {},
            get index() {
                return global.config.folders.source + '/' + global.config.filenames.html.index;
            },
            get scripts() {
                return global.config.folders.source + '/' + global.config.filenames.patterns.scripts;
            },
            get main() {
                return global.config.folders.source + '/' + global.config.filenames.main.scripts;
            },
            get tests() {
                return global.config.folders.source + '/' + global.config.filenames.patterns.tests;
            },
            get templates() {
                return global.config.folders.source + '/' + global.config.filenames.patterns.templates;
            }
        },
        temp: {
            get scripts() {
                return global.config.folders.temp + '/' + global.config.filenames.temp.scripts;
            },
            get index() {
                return global.config.folders.temp + '/*.html';
            },
            get tests() {
                return global.config.folders.temp + '/' + global.config.filenames.patterns.tests;
            }
        }
    },
    filenames: {
        main: {
            scripts: 'index.js',
            tests: 'index.spec.js'
        },
        html: {
            index: 'index.html'
        },
        temp: {
            styles: 'index.css',
            scripts: 'index.js'
        },
        release: {
            styles: 'index.css',
            scripts: 'index.js'
        },
        patterns: {
            scripts: '/**/*.js',
            tests: '/**/*.spec*.js',
            templates: '/**/*.html'
        },
        get config() {
            return 'config.{environment}.json'.replace('{environment}', global.config.buildProcess.environment);
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
            esnext: true,
            configPath: global.config.folders.gulpConfig + '.jscsrc'
        };
    },
    uglify: {
        mangle: false
    },
    minifyHtml: {
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyElements: true
    },
    buildProcess: {
        useTemplateCache: false,
        isReleaseBuild: false,
        isTestBuild: false,
        cacheKey: 'dev',
        get environment() {
            if (process.env['FRONTEND_ENV']) {
                return process.env['FRONTEND_ENV'];
            } else {
                return 'develop';
            }
        },
        addScriptElementsWithAsync: false,
        metaInformation: {
            withBuildVersion: true,
            withBuildDate: true
        }
    },
    webpack: {
        develop: {
            debug: true,
            devtool: '#source-map',
            watchDelay: 200,
            watch: true
        },
        test: {
            watch: false
        },
        release: {
            watch: false
        },
        loaders: []
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
            get index() {
                return global.config.folders.source + '/index.html';
            }
        },
        browser: {
            uri: 'http://localhost:8080'
            //app: 'firefox'
        }
    }
};

//parts of the config may be defined in the directive gulpfile
//and may overrides every setting
global.config = global.config || {};
global.config = extend(true, defaultConfig, global.config);
