var bmEmailTemplatizer = require('../lib');

bmEmailTemplatizer
  .allLocalesAllFiles()
  .then(function(results) {
    console.log('res', results);
  });