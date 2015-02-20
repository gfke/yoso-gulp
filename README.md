# yoso-gulp

A build workflow using [gulp](http://gulpjs.com/) to include all JS and CSS dependencies as [NPM](https://www.npmjs.com/) 
packages with [browserify](http://browserify.org/) and [rework](https://github.com/reworkcss/rework-npm).


## Install
```bash
$ npm install --save-dev gfke/yoso-gulp
```

## Usage
```bash
 gulp develop (default) 
```

## Tasks
There are two main workflow tasks 

*Develop* and *BuildRelease*

The other task are individual tasks, which normally do not need to be executed directly


### Develop
This is the task that will compile
everything in a debug friendly, non-minimized version and adds watcher for file changes
Opens a connect server with livereload to serve the current state of the application and all dependencies
Cleans everything from previous development and release builds before

### BuildRelease
Set all config values necessary for build, create the cache key and update the file names
and call 'BuildStyles', 'BuildIndex' and after that 'BuildReleaseScripts', 'BuildReleaseStyles'
Then compiles the current state of the application and all dependencies
to a minified, release ready version in the application folder
Cleans everything from previous development and release builds before


### ResolveJsAndCssDependencies
This task calls browserify to resolve all JS dependencies and compiles them into a release bundle
While the packages are resolved, each package with a style defined in will be added to an temporary list
of CSS dependencies which will then be resolved by rework to combine all CSS files from all packages into one
CSS bundle
If a style dependency is a SCSS file it will be compiled to CSS on the fly
*Works only in the app - won't do anything in other projects like directives*

### LintScripts
This task runs [jscs](http://jscs.info/) and [JSLint](http://jslint.com/) with the configurations stored
in this module (local settings are ignored) to ensure same code style and quality on all modules

### LintStyles
This task runs [scss-lint](https://github.com/causes/scss-lint) with the configurations stored
in this module (local settings are ignored) to ensure same sass style and quality on all modules

### UnitTest
This task runs your unit tests directly in Node using [Jasmine](http://jasmine.github.io/)
No [karma](http://karma-runner.github.io) or [phantomJs](http://phantomjs.org/) necessary

### BuildReleaseScripts
Minify browserify bundle and templateCache
After that, add the cache key to the filename and copy it to the app folder

### BuildReleaseScripts
Minify CSS bundle and apply vendor prefixes
After that, add the cache key to the filename and copy it to the app folder

### BuildIndex
This task copies the index.html file from the sources to the app folder
and inserts the correct link to the JS and CSS files
On ReleaseBuild it also minifies the HTML

### BuildStyles
Compiles the application styles and concatenates them with the styles
previously build from the dependencies
Has a hard dependency on the 'ResolveJsAndCssDependencies' task

### Clean
Deletes the temporary folder and all files that may have been created in the application folder
by either the Develop or the BuildRelease task

### Serve
Add a watcher on the temporary and application folder to watch for changes on script, styles, markup or images

### ServeHttp
Open a connect HTTP server with livereload to serve the application

### ServeRefresh
Triggers the live reload
