'use strict';

var jasmine     = require('gulp-jasmine');

/**
 * This task runs your unit tests directly in node using jasmine
 * No kharma or phantomJs necessary
 * Uses webpack to build, witches main entry from application to test index
 */
module.exports = function(gulp) {
    var runsequence = require('run-sequence').use(gulp);

    gulp.task('unit-test', function (cb) {
        //Set build process to test mode
        global.config.buildProcess.isTestBuild = true;

        //Change default config to use test sources instead
        var mainScript = global.config.filenames.main.scripts.valueOf(),
            tempScript = global.config.filenames.temp.scripts.valueOf();

        global.config.filenames.main.scripts = global.config.filenames.main.tests;
        global.config.filenames.temp.scripts = global.config.filenames.main.tests;

        gulp.task('run-tests', function () {
            return gulp.src(global.config.paths.temp.tests)
                .pipe(jasmine(global.config.jasmine));
        });

        runsequence(
            'clean',
            'build-webpack',
            'run-tests',
            function () {
                //Reset the isTestBuild flag and script names
                //after everything was executed
                //as there may be a develop/release build running afterwards
                //on the same process
                global.config.buildProcess.isTestBuild = false;
                global.config.filenames.main.scripts = mainScript;
                global.config.filenames.temp.scripts = tempScript;
                //Force reloading of the webpack-config on next build
                delete require.cache[require.resolve('../webpack.config.js')];

                cb();
            }
        );

    });
}
