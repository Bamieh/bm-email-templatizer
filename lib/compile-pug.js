var cons = require('consolidate'),
    extend = require('./extend-mixin');

module.exports = function compilePug() {
  var settings = this;
  
  return new Promise(function (resolve, reject) {

    var activeFile = settings.activeFile;
    if(!activeFile) return reject(new Error('activeFile undefined'));

    settings.consolidate.locals.setLocale(settings.activeLocale);
    
    var mergedOptions = extend(true, settings.consolidate.options, settings.consolidate.locals);

    var viewEngine = settings.consolidate.viewEngine;

    cons[viewEngine](activeFile, mergedOptions, function(err, html){
      if (err) return reject(err);

      resolve({ "html": html });
    });
  });
}
