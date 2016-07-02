var path = require('path'),
  scanDir = require('../../lib/scan-dir'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;
chai.use(chaiAsPromised);

describe('System IO', function() {
  describe('scanDir::glob', function() {
    var context;
    before('setup', function() {
      context = {
        paths: global.MochaSetup.paths
      }
    });

    it('should take context from `this`', function() {
      var readFile = scanDir.glob.call(context, 'views');
      return expect(readFile).to.eventually.be.an('array');
    });

    it('should take context from function parameters', function() {
      var readFile = scanDir.glob('views', context);
      return expect(readFile).to.eventually.be.an('array');
    });
    
    it('should return a promise', function() {
      var readFile = scanDir.glob.call(context, 'views');
      return expect(readFile).to.be.instanceof(Promise);
    });


    it('should return an array of files', function() {
      var readFile = scanDir.glob.call(context, 'views');
      return expect(readFile).to.eventually.be.an('array');
    });
    
    it.skip('should only return files matching glob Pattern', function() {

    })
    it.skip('should catch errors', function() {

    });
  });
});