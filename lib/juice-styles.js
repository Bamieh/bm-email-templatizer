var juice = require('juice');

module.exports = {
  juiceStyles: function juiceStyles(data) {
    var promise = new Promise(function (resolve, reject) {
      resolve({
        juiced: juice.inlineContent(data.html, data.css)
      });
    });
    return promise;
  }
}