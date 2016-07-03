var path = require('path'),
  compilePug = require('../../lib/compile-pug'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;

chai.use(chaiAsPromised);

describe('compile-pug', function() {
  var context,
      missingContext,
      undefinedActiveFileContext;

  before('setup', function() {
    context = {
      paths: global.MochaSetup.paths,
      activeFile: 'views/basic.pug',
      activeLocale: 'en.json'
    }
    missingContext = {
      paths: global.MochaSetup.paths,
      activeFile: 'missing.pug',
      activeLocale: 'en.json'
    }
    undefinedActiveFileContext = {
      paths: global.MochaSetup.paths,
      activeLocale: 'en.json'
    }
  });

  it('returns a promise', function() {
    var compiled = compilePug.call(context);
    return expect(compiled).to.be.instanceof(Promise);
  });

  it('takes the context from `this`', function() {
    var compiled = compilePug.call(context);
    return expect(compiled).to.eventually.be.an('object');
  });

  it('catch errors on file missing', function() {
    var compiled = compilePug.call(missingContext);

    return expect(compiled).to.be.rejected
      .then(function(error) {
          expect(error).to.be.an('error');
          expect(error).to.have.property('code', 'ENOENT');
          expect(error).to.have.property('errno', -2);
      });
  });

  it('catch errors on undefined activeFile', function() {
    var compiled = compilePug.call(undefinedActiveFileContext);

    return expect(compiled).to.be.rejected
      .then(function(error) {
          expect(error).to.be.an('error');
          expect(error).to.have.property('code', 'EISDIR');
          expect(error).to.have.property('errno', -21);
      });
  });

  it('resolves into object with `html` property', function() {
    var compiled = compilePug.call(context);
    return expect(compiled).to.eventually.be.an('object').and.to.have.property('html');
  });

  it('resolves compiled file properly', function() {
    var compiled = compilePug.call(context);
    return expect(compiled).to.eventually.be.an('object').
      and.to.have.property('html',
        '<html><body><h1>Basic Test View</h1><p>Lorem ipsum Deserunt cupidatat commodo amet dolore proident.</p></body></html>');
  });

  it.skip('accepts options and pass them into pug compiler', function() {});
});