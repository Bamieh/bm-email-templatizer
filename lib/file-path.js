var path = require('path');
module.exports = { filePath: filePath() };

function filePath() {
  return {
    basePath : path.join(__dirname),
    filePath: 'example',
    // sass: function sass(){
    sass: function sass(){
      return path.join(
          this.__defaults__.basePath,
          this.__defaults__.filePath,
          'scss',
          'index.scss');
    },
    pug: function pug() {
      return path.join(
          this.__defaults__.basePath,
          this.__defaults__.filePath,
          'views',
          'test.pug');
    },
    locale: function locale() {
      return path.join(
        this.__defaults__.basePath,
        this.__defaults__.filePath,
        'locales',
        'en.json');
    }
  }
}