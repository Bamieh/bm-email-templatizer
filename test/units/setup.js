var path = require('path'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;
chai.use(chaiAsPromised);

before(function() {
  console.log('Starting');
  global.MochaSetup = {};
  global.MochaSetup.paths = {
    'base': path.join(__dirname, '..', 'sample'),
    'locales': 'i18n-locales',
    'views': 'views/**/*.pug'
  }
});

after(function() {});