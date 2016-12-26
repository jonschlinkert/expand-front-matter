# expand-front-matter [![NPM version](https://img.shields.io/npm/v/expand-front-matter.svg?style=flat)](https://www.npmjs.com/package/expand-front-matter) [![NPM monthly downloads](https://img.shields.io/npm/dm/expand-front-matter.svg?style=flat)](https://npmjs.org/package/expand-front-matter)  [![NPM total downloads](https://img.shields.io/npm/dt/expand-front-matter.svg?style=flat)](https://npmjs.org/package/expand-front-matter) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/expand-front-matter.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/expand-front-matter)

> Middleware for processing config templates in front matter. Can be used with verb, assemble v0.6.0 and greater, or any application based on jonschlinkert/templates.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save expand-front-matter
```

## Usage

Works with [assemble](https://github.com/assemble/assemble), [verb](https://github.com/verbose/verb), [generate](https://github.com/generate/generate), [update](https://github.com/update/update), or any [Template](https://github.com/jonschlinkert/template)-based application. Just replace assemble in the examples with your application of choice.

### Preparation

This requires front-matter to be parsed in advance. You can easily do this with [parser-front-matter](https://github.com/jonschlinkert/parser-front-matter) like this:

```js
var assemble = require('assemble');
var app = assemble();

// parse front matter on all `hbs` files
app.onLoad(/\.hbs$/, function(view, next) {
  matter.parse(view, next);
});
```

### Middleware usage

Use as a middleware:

```js
var expand = require('expand-front-matter');
var assemble = require('assemble');
var app = assemble();

app.onLoad(/\.hbs$/, expand(app));
app.pages('*.hbs');
```

### Plugin usage

**app plugin**

Use as an "instance" plugin on `app` to expand templates in the front-matter of all views in all collections:

```js
var expand = require('expand-front-matter');
var assemble = require('assemble');
var app = assemble();
app.use(expand());

app.pages('*.hbs');
```

**Collection plugin**

Use as a collection instance plugin to expand templates in the front-matter of all views in the collection:

```js
var expand = require('expand-front-matter');
var assemble = require('assemble');
var app = assemble();
app.create('pages')
  .use(expand(app));

app.pages('*.hbs');
```

**view plugin**

Use as a view plugin to expand templates in the front-matter of a specific view:

```js
var expand = require('expand-front-matter');
var assemble = require('assemble');
var app = assemble();
app.create('pages')

app.page('foo', {content: '...'})
  .use(expand(app))
  .render(function(err, res) {
    //=> do stuff to res
  });
```

## About

### Related projects

* [assemble](https://www.npmjs.com/package/assemble): Get the rocks out of your socks! Assemble makes you fast at creating web projects… [more](https://github.com/assemble/assemble) | [homepage](https://github.com/assemble/assemble "Get the rocks out of your socks! Assemble makes you fast at creating web projects. Assemble is used by thousands of projects for rapid prototyping, creating themes, scaffolds, boilerplates, e-books, UI components, API documentation, blogs, building websit")
* [expand](https://www.npmjs.com/package/expand): Recursively resolve templates in an object, string or array. | [homepage](https://github.com/jonschlinkert/expand "Recursively resolve templates in an object, string or array.")
* [template](https://www.npmjs.com/package/template): Render templates using any engine. Supports, layouts, pages, partials and custom template types. Use template… [more](https://github.com/jonschlinkert/template) | [homepage](https://github.com/jonschlinkert/template "Render templates using any engine. Supports, layouts, pages, partials and custom template types. Use template helpers, middleware, routes, loaders, and lots more. Powers assemble, verb and other node.js apps.")
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://github.com/verbose/verb) | [homepage](https://github.com/verbose/verb "Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used on hundreds of projects of all sizes to generate everything from API docs to readmes.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/expand-front-matter/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.0, on December 26, 2016._