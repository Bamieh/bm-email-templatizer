var juice = require('juice2');

module.exports = {
  juiceStyles: function juiceStyles(data) {
    console.log(data);
    var promise = new Promise(function (resolve, reject) {
      
      var juiced = juice.inlineContent(data.html, data.css);
      resolve({juiced: juiced});

    });
    return promise;
  }
}