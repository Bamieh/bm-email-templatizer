var path = require('path'),
  localization = require('../../lib/localization'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;

chai.use(chaiAsPromised);

describe('localization', function() {
  describe('ReadLocaleFile', function() {
    var context, missingFileContext;
    var jsonLocale = require('../sample/i18n-locales/en.json');

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
      var readFile = localization.readLocaleFile.call(context)
      return expect(readFile).to.eventually.deep.equal(jsonLocale);
    });

    it('should take context from function parameters', function() {
      var readFile = localization.readLocaleFile(context);
      return expect(readFile).to.eventually.be.an('object');
    });

    it('should return a promise', function() {
      var readFile = localization.readLocaleFile.call(context)
      return expect(readFile).to.be.instanceof(Promise);
    });

    it('Promise resolves json content', function() {
      var readFile = localization.readLocaleFile(context)
      // return expect(readFile).to.be.an('object');
      return expect(readFile).to.eventually.be.an('object');
    });

    it('catch error on file missing', function() {
      var readFile = localization.readLocaleFile(missingFileContext)
      return expect(readFile).to.be.rejected
        .then(function(error) {
            expect(error).to.be.an('error');
            expect(error).to.have.property('code', 'ENOENT');
            expect(error).to.have.property('errno', -2);
        });
    });


  });
});