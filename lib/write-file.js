var fs = require('fs'),
  filePath = require('./file-path');

function writeFile(destPath, content) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(destPath, content, function(error) {
      if (error) return reject(error), false;
      resolve({'HtmlPath': destPath});
    });
  });
}

function splitByLastDot(fileName) {
    var index = fileName.lastIndexOf('.');
    return fileName.slice(0, index);
}

module.exports = function writeHtml(data) {
  var fileName = splitByLastDot(this.activeFile) + '.html';
  var folderPath = splitByLastDot(this.activeLocale);
  var fullPath = filePath.call(this, 'compiled', folderPath + '/' + fileName);
  return writeFile(fullPath, data.juiced);
}