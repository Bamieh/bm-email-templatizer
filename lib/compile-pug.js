var pug = require('pug');

module.exports = {
  compilePug: function compilePug() {
    var fullPath = this.filePath.pug.call(this);

    var locale = this.localization.locale.call(this);
    locale.__ = function(variableName) { return '#{'+ variableName + '}'; };
    
    var promise = new Promise(function (resolve, reject) {
      
      var options = { writeCustom: function() {
        return 'customWrite';
      }};
      
      var fn = pug.compileFile(fullPath, options);
      var html = fn( locale );

      resolve({html: html});

    });

    return promise;
  }
}