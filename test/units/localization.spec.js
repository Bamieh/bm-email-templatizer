var path = require('path'),
  localization = require('../../lib/localization'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;

chai.use(chaiAsPromised);

describe('localization', function() {
  describe('ReadLocaleFile', function() {
    var settings, missingFileSettings;
    var jsonLocale = require('../sample/i18n-locales/en.json');

    before(function() {
      var paths = {
        'base': path.join(__dirname, '..', 'sample'),
        'locales': 'i18n-locales'
      };

      settings = {
        'paths': paths,
        'activeLocale': 'en.json'
      };

      missingFileSettings = {
        'paths': paths,
        'activeLocale': 'missing.json'
      };

    });

    it('should return a promise', function() {
      var readFile = localization.readLocaleFile.call(settings)
      return expect(readFile).to.be.instanceof(Promise);
    });

    it('Promise resolves json content', function() {
      var readFile = localization.readLocaleFile(settings)
      // return expect(readFile).to.be.an('object');
      return expect(readFile).to.eventually.be.an('object');
    });

    it('catch error on file missing', function() {
      var readFile = localization.readLocaleFile(missingFileSettings)
      return expect(readFile).to.be.rejected
        .then(function(error) {
            expect(error).to.be.an('error');
            expect(error).to.have.property('code', 'ENOENT');
            expect(error).to.have.property('errno', -2);
        });
    });

    it('should take settings from `this`', function() {
      var readFile = localization.readLocaleFile.call(settings)
      return expect(readFile).to.eventually.deep.equal(jsonLocale);
    });

    it('should take settings from funciton parameters', function() {
      var readFile = localization.readLocaleFile(settings);
      return expect(readFile).to.eventually.be.an('object');
    });

  });
});