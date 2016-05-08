var sass = require('node-sass');

module.exports = {
  compileSass: function compileSass() {
    var scssFile = this.getPath('scss', 'index.scss');

    var sassOptions = {
      file: scssFile,
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
}