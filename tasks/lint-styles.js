'use strict';

var scssLint     = require('gulp-scss-lint');

module.exports = function(gulp) {
    gulp.task('lint-styles', function () {
        return gulp.src(global.config.paths.source.styles);
            //.pipe(scssLint(global.config.scssLint));
    });
}
