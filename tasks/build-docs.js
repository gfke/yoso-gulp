'use strict';

var run = require('gulp-run');

module.exports = gulp.task('clean', function () {
    return run('npm wicked').exec();
});
