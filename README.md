# yoso-gulp
    
[![wercker status](https://app.wercker.com/status/485cf3266d13ef7c814aaa13fdd357f9/m "wercker status")](https://app.wercker.com/project/bykey/485cf3266d13ef7c814aaa13fdd357f9)
    
A build workflow using [gulp](http://gulpjs.com/) to include all JS and CSS dependencies as [NPM](https://www.npmjs.com/) 
packages with [webpack](http://webpack.github.io/).

See [Wiki](https://github.com/gfke/yoso-gulp/wiki) for more details

## Install
```bash
$ npm install --save-dev gfke/yoso-gulp
```
The SCSS linting relies on a ruby gem which needs to be installed
```bash
$ sudo gem install scss-lint
```

## Usage
```bash
 gulp develop (default)  # Compile build for debugging / development 
                           and start debugging server / refreshes on every code change
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

### build-docs
Parses all comments in the Javascript code using [JSdoc](http://usejsdoc.org/) and
automagically creates a browseable Wiki on the Github repository of your project.
Updates only the API part of the Wiki - all manually added documentation will stay untouched

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
Minify webpack bundle and templateCache
After that, add the cache key to the filename and copy it to the app folder

### build-release-styles
Minify CSS bundle 
After that, add the cache key to the filename and copy it to the app folder

### build-index
This task copies the index.html file from the sources to the app folder
and inserts the correct link to the JS files
On ReleaseBuild it also minifies the HTML and adds the cache key to the filename

### build-webpack
Calls [webpack](http://webpack.github.io/) to resolve all require calls and create a Javascript bundle
that will hold all Javascript modules, their styles and their SVGs.
All dependencies are resolved in this bundle.

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

### unit-test
This task runs your unit tests directly in Node using [Jasmine](http://jasmine.github.io/)
No [karma](http://karma-runner.github.io) or [phantomJs](http://phantomjs.org/) necessary
Unit tests as well as the tested source files may be written in ES6 as both are compiled in a tmp
folder before executed
**NOTE: This will only compile the first tier sources and tests! If you import another module that is written in ES6 you must mock it out using (mockery)[https://github.com/mfncooper/mockery/] **
**NOTE: You may not use ES6 __import__ instead of __require__ as it is compiled to the top of the file and breaks any mockery attempts**
