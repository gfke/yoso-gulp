'use strict';

require('./config');

/**
 * Register all task on the provided gulp instance
 * @param {object} gulp The gulp instance on which the tasks should be registered
 */
module.exports = function (gulp) {
    require('./tasks/build-develop.js')(gulp);
    require('./tasks/build-index.js')(gulp);
    require('./tasks/build-release.js')(gulp);
    require('./tasks/build-release-clean.js')(gulp);
    require('./tasks/build-release-copy.js')(gulp);
    require('./tasks/build-release-http.js')(gulp);
    require('./tasks/build-release-scripts.js')(gulp);
    require('./tasks/build-release-styles.js')(gulp);
    require('./tasks/clean.js')(gulp);
    require('./tasks/code-quality.js')(gulp);
    require('./tasks/develop.js')(gulp);
    require('./tasks/http.js')(gulp);
    require('./tasks/http-browser.js')(gulp);
    require('./tasks/http-refresh.js')(gulp);
    require('./tasks/http-server.js')(gulp);
    require('./tasks/lint-scripts.js')(gulp);
    require('./tasks/lint-styles.js')(gulp);
    require('./tasks/unit-tests.js')(gulp);
    require('./tasks/watch-unit-tests.js')(gulp);
    require('./tasks/webpack-build.js')(gulp);
};
