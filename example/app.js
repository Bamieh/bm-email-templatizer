var bmEmailTemplatizer = require('../lib');

var options = {
  paths: {
    'base': __dirname
  }
};

bmEmailTemplatizer
  .setOptions(options)
  .allLocalesAllFiles()
  .then(function(results) {
    console.log('res', results);
  });