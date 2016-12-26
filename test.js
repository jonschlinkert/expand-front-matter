'uses strict';

require('mocha');
var assert = require('assert');
var assemble = require('assemble');
var loader = require('assemble-loader');
var matter = require('parser-front-matter');
var expand = require('./');
var app;

describe('expand', function () {
  beforeEach(function () {
    app = assemble();
    app.use(loader());
    app.create('pages');

    app.onLoad(/./, matter.parse);
  });

  it('should expand config templates in front matter', function () {
    app.data({title: 'test'});
    app.onLoad(/./, expand(app));
    app.pages('fixtures/*.md');
    assert.equal(app.pages.getView('a.md').data.title, 'test');
  });

  it('should expand config templates in front matter with `.middleware`:', function () {
    app.data({title: 'test'});
    app.onLoad(/./, expand.middleware(app));
    app.pages('fixtures/*.md');
    assert.equal(app.pages.getView('a.md').data.title, 'test');
  });

  it('should support locals as the second argument:', function () {
    app.data({title: 'test'});
    app.onLoad(/./, expand.middleware(app, {title: 'something else'}));
    app.pages('fixtures/*.md');
    assert.equal(app.pages.getView('a.md').data.title, 'something else');
  });

  it('should work as an "app" plugin:', function () {
    app.create('posts');
    app.data({title: 'test'});
    app.post('fixtures/a.md');
    app.use(expand());

    assert.equal(app.posts.getView('a.md').data.title, 'test');
  });

  it('should work as a "collection" plugin:', function () {
    app.data({title: 'test'});
    app.create('posts')
    app.post('fixtures/a.md');
    app.posts.use(expand(app));

    assert.equal(app.posts.getView('a.md').data.title, 'test');
  });

  it('should work as a "view" plugin:', function () {
    app.data({title: 'test'});
    app.pages('fixtures/*.md');

    app.pages.getView('fixtures/a.md')
      .use(expand(app))

    assert.equal(app.pages.getView('a.md').data.title, 'test');
  });
});
