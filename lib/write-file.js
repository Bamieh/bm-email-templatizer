var fs = require('fs');

module.exports = {
  writeFile: function writeFile(data) {
    var filePath = this.filePath.dest.call(this);
    var promise = new Promise(function (resolve, reject) {
      fs.writeFile(filePath, data.juiced, function(error) {
        if (error) return reject(error), false;
        resolve({'HtmlPath': filePath});
      });
    });
    return promise;
  }
}