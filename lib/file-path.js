var path = require('path'),
  pathsObj = {};

module.exports = function getPath(key, file) {
  file = file || "";
  var objKey = key + file;
  if(!pathsObj[objKey]) {
    pathsObj[objKey] = path.join(this.paths.base, this.paths[key], file);
  }

  return pathsObj[objKey];
}
