var path = require('path'),
  fileUtls = require('../../../lib/file-utls.js'),
  readActiveLocale = fileUtls.readActiveLocale,
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect,
  jsonLocale = require('../../sample/i18n-locales/en.json');

chai.use(chaiAsPromised);

describe('readActiveLocale', function() {
  var context,
    missingFileContext,
    undefinedActiveLocaleContext;

  before('setup', function() {
    context = {
      'paths': global.MochaSetup.paths,
      'activeLocale': 'en.json'
    };

    missingFileContext = {
      'paths': global.MochaSetup.paths,
      'activeLocale': 'missing.json'
    };
    undefinedActiveLocaleContext = {
      'paths': global.MochaSetup.paths
    }

  });

  it('returns a promise', function() {
    var readFile = readActiveLocale.call(context)
    return expect(readFile).to.be.instanceof(Promise);
  });

  it('catch error on file missing', function() {
    var readFile = readActiveLocale(missingFileContext)
    return expect(readFile).to.be.rejected
      .then(function(error) {
          expect(error).to.be.an('error');
          expect(error).to.have.property('code', 'ENOENT');
          expect(error).to.have.property('errno', -2);
      });
  });
  it('catch error on undefined activeLocale', function() {
    var readFile = readActiveLocale(undefinedActiveLocaleContext)
    return expect(readFile).to.be.rejected
      .then(function(error) {
          expect(error).to.be.an('error');
          expect(error).to.have.property('code', 'EISDIR');
          expect(error).to.have.property('errno', -21);
      });
  });

  it('resolves into an object', function() {
    var readFile = readActiveLocale(context)
    // return expect(readFile).to.be.an('object');
    return expect(readFile).to.eventually.be.an('object');
  });

  it.skip('resolves an object containing json locale file', function() {});
  it.skip('accepts custom functions', function() {});
  it.skip('passes custom functions into resolved object', function() {});


  it('takes context from `this`', function() {
    var readFile = readActiveLocale.call(context)
    return expect(readFile).to.eventually.deep.equal(jsonLocale);
  });

  it('takes context from function parameters', function() {
    var readFile = readActiveLocale(context);
    return expect(readFile).to.eventually.be.an('object');
  });

});