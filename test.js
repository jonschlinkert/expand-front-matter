/* deps: mocha */
var assert = require('assert');
var should = require('should');
var expand = require('./');
var matter = require('parser-front-matter');
var assemble = require('assemble');
var loader = require('assemble-loader');
var app;


describe('expand', function () {
  beforeEach(function () {
    app = assemble();
    app.use(loader());
    app.create('pages');

    app.onLoad(/./, function (view, next) {
      matter.parse(view, next);
    });
  });

  it('should expand config templates in front matter:', function () {
    app.data({title: 'test'});
    app.onLoad(/./, expand(app));
    app.pages('fixtures/*.md');
    assert(app.views.pages['fixtures/a.md'].data.title === 'test');
  });

  it('should support locals as the second argument:', function () {
    app.data({title: 'test'});
    app.onLoad(/./, expand(app, {title: 'something else'}));
    app.pages('fixtures/*.md');
    assert(app.views.pages['fixtures/a.md'].data.title === 'something else');
  });

  it('should work as a "view" plugin:', function () {
    app.data({title: 'test'});
    app.pages('fixtures/*.md');

    app.pages.getView('fixtures/a.md')
      .use(expand(app))

    assert(app.views.pages['fixtures/a.md'].data.title === 'test');
  });

  it('should work as an "app" plugin:', function () {
    app.data({title: 'test'});
    app.use(expand());
    app.create('posts');

    app.post('fixtures/a.md');
    assert(app.views.posts['fixtures/a.md'].data.title === 'test');
  });

  it('should work as a "collection" plugin:', function () {
    app.data({title: 'test'});
    app.create('posts')
      .use(expand(app));

    app.post('fixtures/a.md');
    assert(app.views.posts['fixtures/a.md'].data.title === 'test');
  });
});
