var Glob = require("glob").Glob

var path = require("path");

/*
  scanDir.glob(globPattern)
 */

module.exports = {
  // provided: function provided() {
  //   return new Promise(function(resolve, reject) {
  //     if(manual instanceof Array) {
  //       return resolve(manual);
  //     }
  //     if(typeof manual === "string") {
  //       return resolve(manual.split(','));
  //     }
  //   });
  // },
  glob: function glob(pathKey) {
    var paths = this.paths;

    var globPattern = path.join(paths.base, paths[pathKey]);

    return new Promise(function(resolve, reject) {
      new Glob(globPattern, function(err, files) {
        if(err) return reject(err);
        return resolve(files);
      })
    });
  }
};