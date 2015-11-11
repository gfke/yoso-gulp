'use strict';

module.exports = function(gulp) {
    require('./config');
    require('./tasks/clean')(gulp);
    require('./tasks/build-develop')(gulp);
    require('./tasks/build-index')(gulp);
    require('./tasks/build-release')(gulp);
    require('./tasks/build-release-clean')(gulp);
    require('./tasks/build-release-copy')(gulp);
    require('./tasks/build-release-http')(gulp);
    require('./tasks/build-release-scripts')(gulp);
    require('./tasks/build-release-styles')(gulp);
    require('./tasks/develop')(gulp);
    require('./tasks/code-quality')(gulp);
    require('./tasks/http')(gulp);
    require('./tasks/http-browser')(gulp);
    require('./tasks/http-refresh')(gulp);
    require('./tasks/http-server')(gulp);
    require('./tasks/lint-scripts')(gulp);
    require('./tasks/lint-styles')(gulp);
    require('./tasks/unit-tests')(gulp);
    require('./tasks/watch-unit-tests')(gulp);
    require('./tasks/webpack-build')(gulp);
};

