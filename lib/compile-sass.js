var sass = require('node-sass'),
  filePath = require('./file-path');

module.exports = function compileSass() {
  var fullPath = filePath.call(this, '/scss/index.scss');
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