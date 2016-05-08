var bmTemplatizer = require('../lib'),
  path = require('path');

// bmEmailTemplatizer.pipeline = ['ahmad', 'bamieh'];

// console.log(bmEmailTemplatizer.pipeline);
// 
bmTemplatizer.options = {
  paths: {
    'base': __dirname
  }
};

bmTemplatizer.compile().then(function(results) {
  console.log('res', results)
});