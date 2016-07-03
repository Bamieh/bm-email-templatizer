var path = require('path'),
  fileUtls = require('../../../lib/file-utls'),
  glob = fileUtls.glob,
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;

chai.use(chaiAsPromised);

describe('fileUtls::glob', function() {
  var context;
  before('setup', function() {
    context = {
      paths: global.MochaSetup.paths
    }
  });

  it('should take context from `this`', function() {
    var readFile = glob.call(context, 'views');
    return expect(readFile).to.eventually.be.an('array');
  });

  it('should take context from function parameters', function() {
    var readFile = glob('views', context);
    return expect(readFile).to.eventually.be.an('array');
  });
  
  it('should return a promise', function() {
    var readFile = glob.call(context, 'views');
    return expect(readFile).to.be.instanceof(Promise);
  });


  it('should return an array of files', function() {
    var readFile = glob.call(context, 'views');
    return expect(readFile).to.eventually.be.an('array');
  });
  
  it.skip('should only return files matching glob Pattern', function() {

  })
  it.skip('should catch errors', function() {

  });
});