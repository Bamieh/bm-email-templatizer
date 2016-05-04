var pug = require('pug'),
  path = require('path');
module.exports = {
  compilePug: function compilePug() {
    var promise = new Promise(function (resolve, reject) {
      
      var fullPath = this.filePath.pug.call(this);
      var options = {};
      
      var fn = pug.compileFile(fullPath, options);
      var html = fn( this.localization.locale.call(this) );

      resolve({html: html});

    }.bind(this));

    return promise;
  }
}