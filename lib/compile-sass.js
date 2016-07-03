var sass = require('node-sass'),
  paths = require('paths');


module.exports = function compileSass() {
  var fullPath = paths.join(this.paths.base, this.paths.scss);
  var sassOptions = {
    file: fullPath,
    outputStyle: 'compressed'
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