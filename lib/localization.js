var filePath = require('./file-path'),
  fs = require('fs');

module.exports = {
  readLocaleFile: function(settings) {
    settings = settings || this;
    var fullPath = filePath.call(settings, settings.activeLocale);
    return new Promise(function(resolve, reject) {
      fs.readFile(fullPath, 'utf8', function(err, file) {
        if(err) return reject(err);
        return resolve(JSON.parse( file ));
      })
    });
  }
}