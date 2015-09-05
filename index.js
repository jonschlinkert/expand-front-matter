/*!
 * expand-front-matter <https://github.com/jonschlinkert/expand-front-matter>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var merge = require('mixin-deep');
var expand = require('expand');

module.exports = function (app, locals) {
  return function (view, next) {
    if (!view.data || view.data.process === false) {
      return next();
    }
    var data = merge({}, app.cache.data, locals);
    view.data = expand(view.data, data);
    next();
  };
};
