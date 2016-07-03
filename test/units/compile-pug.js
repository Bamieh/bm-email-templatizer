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
    var base = global.MochaSetup.paths.base;
    var activeLocale = path.join(base, 'i18n-locales', 'en.json');
    var activeFile = path.join(base, 'views', 'basic.pug');


    context = {
      paths: global.MochaSetup.paths,
      activeFile: activeFile,
      activeLocale: activeLocale
    }
    missingContext = {
      paths: global.MochaSetup.paths,
      activeFile: 'missing.pug',
      activeLocale: activeLocale
    }
    undefinedActiveFileContext = {
      paths: global.MochaSetup.paths,
      activeLocale: activeLocale
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

    return expect(compiled).to.be.rejected.and.to.eventually.be.an('error');
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