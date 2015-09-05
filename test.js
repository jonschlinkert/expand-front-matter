/* deps: mocha */
var assert = require('assert');
var should = require('should');
var expand = require('./');
var Assemble = require('assemble').Assemble;
var assemble;


describe('expand', function () {
  beforeEach(function () {
    assemble = new Assemble();
    assemble.defaultConfig();
  });

  it('should expand config templates in front matter:', function () {
    assemble.data({title: 'test'});
    assemble.onLoad(/./, expand(assemble));
    assemble.pages('fixtures/*.md');
    assert(assemble.views.pages['fixtures/a.md'].data.title === 'test');
  });

  it('should support locals as the second argument:', function () {
    assemble.data({title: 'test'});
    assemble.onLoad(/./, expand(assemble, {title: 'something else'}));
    assemble.pages('fixtures/*.md');
    assert(assemble.views.pages['fixtures/a.md'].data.title === 'something else');
  });
});
