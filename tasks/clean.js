'use strict';

var del = require('del');

module.exports = function (gulp) {
    gulp.task('clean', function () {
        return del([global.config.folders.temp]);
    });
};
