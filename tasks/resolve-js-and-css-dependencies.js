'use strict';

var browserify = require('browserify'),
    extend     = require('extend'),
    fs         = require('fs'),
    gulp       = require('gulp'),
    mkdirp     = require('mkdirp'),
    partialify = require('partialify'),
    path       = require('path'),
    rework     = require('rework'),
    reworkNpm  = require('rework-npm'),
    sass       = require('node-sass'),
    source     = require('vinyl-source-stream');

/**
 *  This task calls browserify to resolve all JS dependencies and compiles them into a release bundle
 *  While the packages are resolved, each package with a style defined in will be added to an temporary list
 *  of CSS dependencies which will then be resolved by rework to combine all CSS files from all packages into one
 *  CSS bundle
 *  If a style dependency is a SCSS file it will be compiled on the fly
 **/
module.exports = gulp.task('ResolveJsAndCssDependencies', function (done) {
    var allStyleDependencies = [];
    var importStatements = [];

    /**
     * Used to create a in memory stylesheet that only contains
     * @import statements for the packages
     */
    function createImportStatement(name) {
        return '@import "' + name + '";\n';
    }

    /**
     * If the package style is a SCSS file, dynamically compile it and
     * return the CSS
     */
    function compileScss(src, file) {
        if (path.extname(file) === '.scss') {
            var options = {
                data: src,
                includePaths: [path.dirname(file)]
            };
            options = extend(options, global.config.sass);

            var sassResult = sass.renderSync(options);
            return sassResult.css;
        }
        return src;
    }

    function saveStyleSheetToTemp(styleSheetContent) {
        mkdirp(global.config.folders.temp, function (err) {
            if (err) {
                throw err;
            }
            fs.writeFileSync(global.config.paths.temp.styles, styleSheetContent);
        });
    }

    /**
     * After browserify gathered the styles from all packages,
     * rework will fetch all styles and combine them in one stylesheet
     * Then writes that to the temp folder and signals gulp that the task is done
     * This functions also looks for errors on browserify bundle events and throws them
     * as they would be suppressed elsewise
     */
    function resolveCssDependencies(error) {
        if (error) {
            throw error;
        }

        var inMemoryStyleSheetWithDependencies = importStatements.join('');

        var compiledDependenciesStyleSheet = rework(inMemoryStyleSheetWithDependencies)
            .use(reworkNpm({prefilter: compileScss}))
            .toString();

        saveStyleSheetToTemp(compiledDependenciesStyleSheet);
        areWeDoneYet();
    }

    /**
     * Gather all packages that have styles defined
     * Keep track of already gathered files to check for doubles
     * @param {object} pkg
     */
    function gatherPackagesWithStyles(pkg) {
        if (pkg.style && allStyleDependencies.indexOf(pkg.name) === -1) {
            allStyleDependencies.push(pkg.name);
            importStatements.push(createImportStatement(pkg.name));
        }
    }

    var semaphoreCount = 0,
        semaphoreTarget = 2;
    /**
     * Semaphore function to check if all concurrent tasks
     * have been completed
     */
    function areWeDoneYet() {
        semaphoreCount++;
        if (semaphoreCount === semaphoreTarget) {
            done();
        }
    }

    //Call browserify to resolve all require statements
    browserify()
        .on('package', gatherPackagesWithStyles)
        .add(global.config.paths.src.main)
        //Always apply partialify transform to enable requiring of templates
        //this must also be defined in package.json of the compiling module
        .transform(partialify)
        //When done with JS dependencies call the function to process CSS dependencies
        .bundle(resolveCssDependencies)
        .pipe(source(global.config.filenames.release.scripts))
        .pipe(gulp.dest(global.config.folders.temp))
        .on('end', areWeDoneYet);
});
