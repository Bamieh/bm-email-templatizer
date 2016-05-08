var pug = require('pug');

module.exports = {
  compilePug: function compilePug() {
    var fullPath = this.getPath('views', 'test.pug');

    var locale = this.localization.locale.call(this);

    locale.__ = function(variableName) { return '#{'+ variableName + '}'; };
    
    var promise = new Promise(function (resolve, reject) {
      
      var options = {};
      
      var fn = pug.compileFile(fullPath, options);
      var html = fn( locale );

      resolve({html: html});

    });

    return promise;
  }
}