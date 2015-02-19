'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

//Minify browserify bundle and templateCache
module.exports = gulp.task('BuildReleaseScripts', function () {
    return gulp.src(global.config.paths.temp.scripts)
        .pipe(ngAnnotate())
        .pipe(uglify((global.config.uglify)))
        .pipe(rename({suffix: '.' + global.config.buildProcess.cacheKey}))
        .pipe(gulp.dest(global.config.paths.dest.release.scripts));
});
