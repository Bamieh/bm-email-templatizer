var filePath = require('./file-path'),
  fs = require('fs');

module.exports = {
  readLocaleFile: function() {
    var fullPath = filePath.call(this, 'locales', this.activeLocale);
    return new Promise(function(resolve, reject) {
      fs.readFile(fullPath, 'utf8', function(err, file) {
        if(err) return reject(err);
        return resolve(JSON.parse( file ));
      })
    });
  }
}