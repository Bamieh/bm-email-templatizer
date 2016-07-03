var sass = require('node-sass'),
  path = require('path');


module.exports = function compileSass() {
  var fullPath = path.join(this.paths.base, this.paths.scss);
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