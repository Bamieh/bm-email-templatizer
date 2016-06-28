var pug = require('pug'),
  filePath = require('./file-path'),
  localization = require('./localization');

module.exports = function compilePug() {
  var settings = this;
  var fullPath = filePath.call(settings, 'views', settings.activeFile)
  var promise = new Promise(function (resolve, reject) {
    localization.readLocaleFile.call(settings).then(function(translation) {

      translation.__ = function(variableName) { return '#{'+ variableName + '}'; };
      translation._r = function(variableName) {
        return String.raw`${variableName}`;
      };
      var options = {};
      
      var fn = pug.compileFile(fullPath, options);
      var html = fn( translation );
      resolve({html: html});
    })
    .catch(function(err) {reject(err)});
  });

  return promise;
}