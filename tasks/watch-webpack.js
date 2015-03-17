'use strict';

var path    = require('path'),
    gulp    = require('gulp'),
    webpack = require('gulp-webpack-build');

var config          = global.config,
    dest            = path.join(__dirname, config.folders.temp),
    sources         = [global.config.paths.source.scripts],
    webpackOptions  = config.buildProcess.isReleaseBuild ? config.webpack.release : config.webpack.develop,
    webpackConfig   = {
        useMemoryFs: true,
        progress: true
    },
    CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;

gulp.task('watch-webpack', function () {
    gulp.watch(sources)
        .on('change', function (event) {
            console.log(event.path);
            if (event.type === 'changed') {
                gulp.src(event.path)
                    .pipe(webpack.closest(path.join(config.folders.gulpConfig, CONFIG_FILENAME)))
                    .pipe(webpack.configure(webpackConfig))
                    .pipe(webpack.overrides(webpackOptions))
                    .pipe(webpack.watch(function (err, stats) {
                        gulp.src(this.path, {base: this.base})
                            .pipe(webpack.proxy(err, stats))
                            .pipe(webpack.format({
                                version: false,
                                timings: true
                            }))
                            .pipe(gulp.dest(dest));
                    }));
            }
        });
});
