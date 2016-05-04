var bmTemplatizer = require('../');

// bmEmailTemplatizer.pipeline = ['ahmad', 'bamieh'];

// console.log(bmEmailTemplatizer.pipeline);
// 

bmTemplatizer.compile().then(function(results) {
  console.log('res', results)
});