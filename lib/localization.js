var path = require('path'),
  fs = require('fs');

module.exports = {
  localization: localization()
}

function privateApi() {

}


function localization() {
  return {

    'locale': function() {
      return JSON.parse(fs.readFileSync(this.filePath.locale.call(this), 'utf8'));
    }

  }
}