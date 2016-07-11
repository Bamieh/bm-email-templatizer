var bmEmailTemplatizer = require('../lib'),
    path = require('path');

function sendToMandrill() {

}

var options = {
  paths: {
    base: path.join(process.cwd(), 'example')
  },
  consolidate: {
    locals: {
      _raw: function(variableName) {
        return String.raw`${variableName}`;
      }
    },
    options: {
      pretty: true
    }
  },
  i18nConfigs: {
    objectNotation: true
  }
};

bmEmailTemplatizer.
  setOptions(options)
  .allLocalesAllFiles()
  .then(function(results) {
   console.log('done: ', results);
  })
  .catch(function(err) {
    console.log('bmEmailTemplatizer Err:', err)
  });
