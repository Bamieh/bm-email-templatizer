var pug = require('pug'),
  path = require('path');

module.exports = function compilePug() {
  var settings = this;
  
  return new Promise(function (resolve, reject) {

    var activeFile = settings.activeFile;
    if(!activeFile) return reject(new Error('activeFile undefined'))

    settings.consolidate.locals.setLocale(settings.activeLocale);
    var fn = pug.compileFile(activeFile, settings.consolidate.options);

    resolve({
      "html": fn( settings.consolidate.locals )
    });

  });
}

/*
  to render pug:
    var html = pug.renderFile(destPath, locale);
    resolve({renderedHtml: html});
 */