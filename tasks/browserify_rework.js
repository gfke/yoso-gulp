'use strict';

var browserify = require('browserify');
var fs = require('fs');
var gulp = require('gulp');
var partialify = require('partialify');
var rework = require('rework');
var reworkNpm = require('rework-npm');
var source = require('vinyl-source-stream');


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
        if (file.indexOf('.scss') !== -1) {
            //TODO: Compile SCSS
            return '/*compiled scss*/';
        }
        return src;
    }

    function saveStyleSheetToTemp(styleSheetContent) {
        var compiledDependenciesStylePath = global.config.filenames.build.styles;
        fs.writeFileSync(compiledDependenciesStylePath, styleSheetContent);
    }

    /**
     * After browserify gathered the styles from all packages,
     * rework will fetch all styles and combine them in one stylesheet
     * Then writes that to the temp folder and signals gulp that the task is done
     */
    function resolveCssDependecies() {
        var inMemoryStyleSheetWithDependencies = importStatements.join('');

        var compiledDependenciesStyleSheet = rework(inMemoryStyleSheetWithDependencies)
            .use(reworkNpm({prefilter: compileScss}))
            .toString();

        saveStyleSheetToTemp(compiledDependenciesStyleSheet);

        done();
    }

    /**
     * Gather all packages that have styles defined
     * Keep track of already gathered files to check for doubles
     * @param pkg
     */
    function gatherPackagesWithStyles(pkg) {
        if (pkg.style && allStyleDependencies.indexOf(pkg.name) === -1) {
            allStyleDependencies.push(pkg.name);
            importStatements.push(createImportStatement(pkg.name));
        }
    }

    //Call browserify to resolve all require statements
    browserify()
        .on('package', gatherPackagesWithStyles)
        .add(global.config.paths.src.modules)
        //Always apply partialify transform to enable requiring of templates
        //this must also be defined in package.json of the compiling module
        .transform(partialify)
        //When done with JS dependencies call the function to process CSS dependencies
        .bundle(resolveCssDependecies)
        .pipe(source(global.config.filenames.build.scripts))
        .pipe(gulp.dest(global.config.folders.release));

});
