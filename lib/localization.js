var path = require('path'),
  fs = require('fs');

module.exports = {
  localization: localization()
}


function localization() {
  return {
    'locale': function() {
      var locales = this.getPath('locales', 'en.json');
      return JSON.parse( fs.readFileSync(locales, 'utf8') );
    }
  }
}