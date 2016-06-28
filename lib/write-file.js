var fs = require('fs'),
  filePath = require('./file-path'),
  mkdirp = require('mkdirp');

function writeFile(destPath, fileName, content) {
  return new Promise(function (resolve, reject) {
    mkdirp(destPath, function (err) {
      if (err) return reject(err);

      fs.writeFile(destPath+'/'+fileName, content, function(error) {
        if (error) return reject(error), false;
        resolve({'HtmlPath': destPath});
      });

    })
  });
}

function splitByLastDot(fileName) {
    var index = fileName.lastIndexOf('.');
    return fileName.slice(0, index);
}

module.exports = function writeHtml(data) {
  var fileName = splitByLastDot(this.activeFile) + '.html';
  var folderPath = splitByLastDot(this.activeLocale);

  var fullPath = filePath.call(this, 'compiled', folderPath);
  return writeFile(fullPath, fileName, data.juiced);
}