var sass = require('node-sass'),
  path = require('path');


module.exports = function compileSass() {
  var settings = this;
  var fullPath = path.join(settings.paths.base, settings.paths.scss);

  var sassOptions = {
    file: fullPath,
    outputStyle: 'compressed',
    functions: {
      'getActiveLocale()': function() {
        var activeLocale = new sass.types.String(settings.activeLocale)
        return activeLocale;
      }
    }
  };

  var promise = new Promise(function (resolve, reject) {
    sass.render(sassOptions, function(error, result) {
      if (error) return reject(error), false;
      resolve({
        'css': result.css.toString()
      });
    });
  });

  return promise;
}