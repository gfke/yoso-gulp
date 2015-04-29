'use strict';

var extend = require('extend');

var defaultConfig = {
    folders: {
        source: './source',
        static: './static',
        scss: './styles',
        temp: './.tmp',
        get tempTests() {
            return global.config.folders.temp + '/tests';
        },
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
            get styles() {
                return global.config.folders.scss + '/' + global.config.filenames.patterns.styles;
            },
            get templates() {
                return global.config.folders.source + '/' + global.config.filenames.patterns.templates;
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
            },
            get tests() {
                return global.config.folders.tempTests + '/' + global.config.filenames.patterns.tests;
            }
        }
    },
    filenames: {
        main: {
            scripts: 'index.js'
        },
        html: {
            index: 'index.html'
        },
        scss: {
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
        },
        patterns: {
            scripts: '/**/*.js',
            styles: '/**/*.scss',
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
        cacheKey: 'dev',
        get environment() {
            if (process.env['FRONTEND_ENV']) {
                return process.env['FRONTEND_ENV'];
            } else {
                return 'develop';
            }
        }
        ,
        addScriptElementsWithAsync: false
    },
    webpack: {
        develop: {
            debug: true,
            devtool: '#source-map',
            watchDelay: 200
        },
        release: {},
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
            get styles() {
                return global.config.folders.scss + '/**/*.{css,scss}';
            },
            get index() {
                return global.config.folders.source + '/index.html';
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
global.config = extend(true, defaultConfig, global.config);
