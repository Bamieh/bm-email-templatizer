var bmTemplatizer = require('../lib'),
  path = require('path');

bmTemplatizer.options = {
  paths: {
    'base': __dirname
  }
};

bmTemplatizer.compile().then(function(results) {
  console.log('res', results)
});