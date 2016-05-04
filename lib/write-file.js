var fs = require('fs');

function writeFile(filePath, content) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(filePath, content, function(error) {
      if (error) return reject(error), false;
      resolve({'HtmlPath': filePath});
    });
  });
}
module.exports = {
  writeHtml: function writeHtml(data) {
    var filePath = this.filePath.dest.call(this);
    return writeFile(filePath, data.juiced);
  }
}