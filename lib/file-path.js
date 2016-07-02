var path = require('path'),
  pathsObj = {};

module.exports = function getPath(file) {
  pathsObj[file] = pathsObj[file] || path.join(this.paths.base, file);
  return pathsObj[file];
}
