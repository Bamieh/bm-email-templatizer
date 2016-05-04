var path = require('path');
module.exports = { filePath: filePath() };

function filePath() {
  return {
    sass: function sass(){
      return path.join(
          this.__defaults__.basePath,
          'scss',
          'index.scss');
    },
    pug: function pug() {
      return path.join(
          this.__defaults__.basePath,
          'views',
          'test.pug');
    },
    locale: function locale() {
      return path.join(
        this.__defaults__.basePath,
        'locales',
        'en.json');
    },
    dest: function dest() {
      return path.join(
        this.__defaults__.basePath,
        'dest',
        'file.html');
    }
  }
}