# yoso-gulp

A build workflow using [gulp](http://gulpjs.com/) to include all JS and CSS dependencies as [NPM](https://www.npmjs.com/) 
packages with [browserify](http://browserify.org/) and [rework](https://github.com/reworkcss/rework-npm).

See [Wiki](https://github.com/gfke/yoso-gulp/wiki) for more details

## Install
```bash
$ npm install --save-dev gfke/yoso-gulp
```

## Usage
```bash
 gulp develop (default)  # Compile build for debugging / development 
                           and start debugging server 
```

```bash
 gulp build-release # Compile fully optimized build for production release
```

## Workflow Batches
There are two main workflow batches that combine and orchestrate 
the other individual task into the two most common workflows

### develop
Cleans everything from previous development builds.
Compiles everything in a debug friendly, 
non-minimized version and adds watcher for file changes
Creates a connect server with livereload to serve the current state of the application and all dependencies
Opens your development browser to view the application

### build-release
Cleans everything from previous development and release builds
Sets all config values necessary for build, creates the cache key.
Builds all sources like the development workflow but additionally minifies all JS, CSS and HTML sources
 and copies the minified version to the app folder, also renaming them to include the cache key.
Finally copies all static files and html templates to the app folder making it ready to be deployed.

### code-quality
Runs all code quality tasks for checking code and style conventions and also runs all tests
*This batch is the only one to be called in modules*

## Individual Tasks
The other tasks are individual tasks, which normally do not need to be executed directly

### build-release-clean
Deletes the app folder, cleaning all files from release builds

### build-release-copy
Copies all static files and all HTML templates to the app folder

### build-release-http

### build-release-scripts
Minify browserify bundle and templateCache
After that, add the cache key to the filename and copy it to the app folder

### build-release-scripts
Minify CSS bundle and apply vendor prefixes
After that, add the cache key to the filename and copy it to the app folder

### build-index
This task copies the index.html file from the sources to the app folder
and inserts the correct link to the JS and CSS files
On ReleaseBuild it also minifies the HTML

### build-styles
Compiles the application styles and concatenates them with the styles
previously build from the dependencies
Has a hard dependency on the *resolve-js-and-css-dependencies* task

### clean
Deletes the temporary folder, cleaning all files from development builds

### http
Add a watcher on the temporary and application folder to watch for changes on script, styles, markup or images

### http-browser
Opens the default browser and navigates to the development server

### http-refresh
Triggers the live reload

### http-server
Open a connect HTTP server with livereload to serve the application

### lint-scripts
This task runs [jscs](http://jscs.info/) and [JSLint](http://jslint.com/) with the configurations stored
in this module (local settings are ignored) to ensure same code style and quality on all modules

### lint-styles
This task runs [scss-lint](https://github.com/causes/scss-lint) with the configurations stored
in this module (local settings are ignored) to ensure same sass style and quality on all modules

### resolve-js-and-css-dependencies
This task calls browserify to resolve all JS dependencies and compiles them into a release bundle
While the packages are resolved, each package with a style defined in will be added to an temporary list
of CSS dependencies which will then be resolved by rework to combine all CSS files from all packages into one
CSS bundle
If a style dependency is a SCSS file it will be compiled to CSS on the fly. If doing so it will also load
the globalVariables SCSS file and import the variable values in there to overwrite all all values in
individual dependencies's style sheets.
*Works only in the app - won't do anything in other projects like directives*

### unit-test
This task runs your unit tests directly in Node using [Jasmine](http://jasmine.github.io/)
No [karma](http://karma-runner.github.io) or [phantomJs](http://phantomjs.org/) necessary
