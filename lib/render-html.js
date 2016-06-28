var pug = require('pug');

module.exports = function renderHtml() {
  var destPath = this.getPath('compiled', this.__defaults__.currentFile + '.html'),
      locale = this.localization.locale.call(this);
  
  var promise = new Promise(function (resolve, reject) {
    var html = pug.renderFile(destPath, locale);
    resolve({renderedHtml: html});
  });

  return promise;
}