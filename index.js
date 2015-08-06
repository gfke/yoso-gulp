'use strict';

require('./config');

/**
 * Register all task on the provided gulp instance
 * @param {object} gulp The gulp instance on which the tasks should be registered
 */
module.exports = function (gulp) {
    require('build-develop.js')(gulp);
    require('build-index.js')(gulp);
    require('build-release.js')(gulp);
    require('build-release-clean.js')(gulp);
    require('build-release-copy.js')(gulp);
    require('build-release-http.js')(gulp);
    require('build-release-scripts.js')(gulp);
    require('build-release-styles.js')(gulp);
    require('clean.js')(gulp);
    require('code-quality.js')(gulp);
    require('develop.js')(gulp);
    require('http.js')(gulp);
    require('http-browser.js')(gulp);
    require('http-refresh.js')(gulp);
    require('http-server.js')(gulp);
    require('lint-scripts.js')(gulp);
    require('lint-styles.js')(gulp);
    require('unit-tests.js')(gulp);
    require('watch-unit-tests.js')(gulp);
    require('webpack-build.js')(gulp);
};
