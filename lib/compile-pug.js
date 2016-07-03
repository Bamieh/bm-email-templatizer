var pug = require('pug'),
  fileUtls = require('./file-utls'),
  path = require('path');

module.exports = function compilePug() {
  var settings = this;
  
  return new Promise(function (resolve, reject) {
    var options = {};
    var activeFile = settings.activeFile || '';

    var fullPath = path.join(settings.paths.base, activeFile);

    fileUtls.readActiveLocale(settings).then(function(localeObj) {
      var fn = pug.compileFile(fullPath, options);
      var html = fn( localeObj );
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