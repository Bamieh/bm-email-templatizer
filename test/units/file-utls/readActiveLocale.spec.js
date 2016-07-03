var path = require('path'),
  fileUtls = require('../../../lib/file-utls.js'),
  readActiveLocale = fileUtls.readActiveLocale,
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect,
  jsonLocale = require('../../sample/i18n-locales/en.json');

chai.use(chaiAsPromised);

describe('fileUtls::readActiveLocale', function() {
  var context, missingFileContext;

  before('setup', function() {
    context = {
      'paths': global.MochaSetup.paths,
      'activeLocale': 'en.json'
    };

    missingFileContext = {
      'paths': global.MochaSetup.paths,
      'activeLocale': 'missing.json'
    };
  });

  it('should take context from `this`', function() {
    var readFile = readActiveLocale.call(context)
    return expect(readFile).to.eventually.deep.equal(jsonLocale);
  });

  it('should take context from function parameters', function() {
    var readFile = readActiveLocale(context);
    return expect(readFile).to.eventually.be.an('object');
  });

  it('should return a promise', function() {
    var readFile = readActiveLocale.call(context)
    return expect(readFile).to.be.instanceof(Promise);
  });

  it('Promise resolves json content', function() {
    var readFile = readActiveLocale(context)
    // return expect(readFile).to.be.an('object');
    return expect(readFile).to.eventually.be.an('object');
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
});