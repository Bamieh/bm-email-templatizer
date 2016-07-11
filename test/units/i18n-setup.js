var path = require('path'),
  compilePug = require('../../lib/compile-pug'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;

chai.use(chaiAsPromised);

describe('compile-pug', function() {
  before('setup', function() {});
  it.skip('if settings.locales is sent, use it', function() {});
  it.skip('if settings.locales is not sent, calculate locales based on settings.paths.locales', function() {});
  it.skip('if settings.paths.locales is absolute, use it', function() {});
  it.skip('if settings.paths.locales is relative, join it with settings.paths.base', function() {});
  it.skip('locales should be in json', function() {});
  

});