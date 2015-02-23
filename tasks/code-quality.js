'use strict';
var gulp = require('gulp');

module.exports = gulp.task('code-quality', function () {
    global.config.buildProcess.isReleaseBuild = false;
    gulp.run(
        ['lint-scripts', 'lint-styles', 'unit-test']
    );
});
