'use strict';

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('mixin-deep', 'merge');
require('expand');
require = fn;

/**
 * Expose `utils`
 */

module.exports = utils;
