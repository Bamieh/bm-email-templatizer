var path = require('path'),
  pathsObj = {};

module.exports = {
  setPaths: function(filePaths) {
    var defaultPaths = this.__paths__;
    if(typeof filePaths === 'object') {
      for (var key in defaultPaths) {
        pathsObj[key] = filePaths[key] || defaultPaths[key];
      }
    }
    console.log('final', pathsObj);
  },
  getPath: function(key, file) {
    return path.join(pathsObj.base, pathsObj[key], (file || '') );
  }
};


// function filePath(paths) {

//   var sass = 
//   return {
//     sass: function sass(){
//       var path = this.__defaults__.path;
//       return path.join( path.base, path.scss, 'index.scss' );
//     },
//     pug: function pug() {
//       var path = this.__defaults__.path;
//       return path.join( path.base, path.views, 'test.pug' );
//     },
//     locale: function locale() {
//       var path = this.__defaults__.path;
//       return path.join( path.base, path.locales, 'en.json' );
//     },
//     dest: function dest() {
//       var path = this.__defaults__.path;
//       return path.join( path.base, path.dest, 'file.html' );
//     }
//   }
// }