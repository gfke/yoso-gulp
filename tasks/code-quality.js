'use strict';

module.exports = function (gulp) {
    gulp.task('code-quality', function () {
        global.config.buildProcess.isReleaseBuild = false;
        gulp.run(
            ['lint-scripts', 'lint-styles', 'unit-test']
        );
    });
};
