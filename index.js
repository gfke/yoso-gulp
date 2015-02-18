'use strict';

var requireDir = require('require-dir');

require('./config');
requireDir('./tasks', {recurse: true});
