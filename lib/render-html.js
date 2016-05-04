var pug = require('pug');

module.exports = {
  renderHtml: function renderHtml() {
    var destPath = this.filePath.dest.call(this);
    var locale = this.localization.locale.call(this);
    
    var promise = new Promise(function (resolve, reject) {
      var html = pug.renderFile(destPath, locale);
      resolve({renderedHtml: html});
    });

    return promise;
  }
}