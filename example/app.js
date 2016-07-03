var bmEmailTemplatizer = require('../lib'),
    path = require('path');


var options = {
  paths: {
    base     : path.join(process.cwd(), 'example')
  }
};
console.log('base path: ', path.join(process.cwd(), 'example'))

bmEmailTemplatizer.
  setOptions(options)
  .allLocalesAllFiles()
  .then(function(results) {
   console.log('done: ', results);
  })
  .catch(function(err) {
    console.log('bmEmailTemplatizer Err:', err)
  });
