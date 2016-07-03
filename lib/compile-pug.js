var pug = require('pug'),
  fileUtls = require('./file-utls'),
  paths = require('paths');

module.exports = function compilePug() {
  var settings = this;
  var fullPath = paths.join(settings.paths.base, settings.activeFile);
  
  var promise = new Promise(function (resolve, reject) {
    fileUtls.readActiveLocale(settings).then(function(translation) {

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

/*
  to render pug:
    var html = pug.renderFile(destPath, locale);
    resolve({renderedHtml: html});
 */