var path =       require('path'),
    fs =         require('fs'),
    Glob =       require("glob").Glob,
    mkdirp =     require('mkdirp');


module.exports = {
  glob: function glob(pathKey, settings) {
    var paths = settings? settings.paths : this.paths;
    var globPattern = path.join(paths.base, paths[pathKey]);

    return new Promise(function(resolve, reject) {
      new Glob(globPattern,function(err, files) {
        if(err) return reject(err);
        return resolve(files);
      })
    });
  },
  writeHtml: function writeHtml(data) {
    var settings = this,
      activeLocale = settings.activeLocale,
      activeFile = settings.activeFile,
      fileName = path.basename(activeFile, path.extname(activeFile)) + '.html',
      folderName = path.basename(activeLocale, path.extname(activeLocale)),
      fullPath = path.join(settings.paths.base, settings.paths.compiled, folderName);

    return new Promise(function (resolve, reject) {

      if(!data) {
        return reject(new Error('no data to be written, expected `data` object got undefined'))
      } else if(!data.juiced) {
        return reject(new Error('no data to be written, `data.juiced` expected string got undefined'))
      }

      mkdirp(fullPath, function (err) {
        if (err) return reject(err);

        var destFile = path.join(fullPath, fileName);

        fs.writeFile(destFile, data.juiced, function(error) {
          if (error) return reject(error), false;
          resolve({'HtmlPath': fullPath});
        });
      })
    });
  }
}




// function provided() {
//   return new Promise(function(resolve, reject) {
//     if(manual instanceof Array) {
//       return resolve(manual);
//     }
//     if(typeof manual === "string") {
//       return resolve(manual.split(','));
//     }
//   });
// }




