var fs = require('fs'),
  filePath = require('./file-path'),
  mkdirp = require('mkdirp'),
  path = require('path');

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
  var fileName = path.basename(this.activeFile, path.extname(this.activeFile)) + '.html';
  var folderName = path.basename(this.activeLocale, path.extname(this.activeLocale));
  
  var fullPath = filePath.call(this, path.join(this.paths.compiled, folderName));

  return writeFile(fullPath, fileName, data.juiced);
}