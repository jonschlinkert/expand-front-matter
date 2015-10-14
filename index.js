/*!
 * expand-front-matter <https://github.com/jonschlinkert/expand-front-matter>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function (app, locals) {
  var opts = (app && app.options) || {};
  var cache = (app && app.cache) || {};
  var expand = utils.expand(opts);
  var data = utils.merge({}, cache.data, locals);

  return function fn(view, next) {
    if (!view.isView) {
      utils.merge(data, view.cache.data);
      return fn;
    }

    if (typeof next !== 'function') {
      next = function () {
        return view;
      };
    }

    if (!view.data || view.data.process === false) {
      return next();
    }

    view.data = expand(view.data, data);
    return next();
  };
};
