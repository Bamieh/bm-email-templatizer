var pug = require('pug'),
  fileUtls = require('./file-utls'),
  path = require('path');

module.exports = function compilePug() {
  var settings = this;
  
  return new Promise(function (resolve, reject) {
    var options = {};
    var activeFile = settings.activeFile || '';

    var fullPath = path.join(settings.paths.base, activeFile);

    fileUtls.readActiveLocale(settings).then(function(translationJson) {

      translationJson.__ = function(variableName) { return '#{'+ variableName + '}'; };
      translationJson._r = function(variableName) {
        return String.raw`${variableName}`;
      };
      var fn = pug.compileFile(fullPath, options);
      var html = fn( translationJson );
      resolve({
        "html": html
      });
    })
    .catch(function(err) {reject(err)});
  });
}

/*
  to render pug:
    var html = pug.renderFile(destPath, locale);
    resolve({renderedHtml: html});
 */