var extend = require('./extend-mixin'),
    fileUtls = require('./file-utls'),
    i18nSetup = require('./i18n-setup');

var pipelineFn = {
  compilePug   : require('./compile-pug'),
  compileSass  : require('./compile-sass'),
  juiceStyles  : require('./juice-styles'),
  writeHtml    : fileUtls.writeHtml
};

var settings = {
  pipeline: ['compilePug', 'compileSass', 'juiceStyles', 'writeHtml'],
  paths: {
    base: process.cwd(),
    scss: 'scss/index.scss',
    locales: 'locales/',
    views: 'views/**/*.pug',
    compiled: 'compiled/'
  },
  consolidate: {
    viewEngine: 'pug',
    locals: {},
    options: {}
  },
  i18nConfigs: {
    locales: undefined
  }
}


function oneLocaleOneFile(fileName, locale) {
  settings.activeLocale = locale;
  settings.activeFile = fileName;
  return settings.pipeline.reduce(function (acc, activeJob) {
    return acc.then(function (res) {
      var runJob = (typeof activeJob === "string")? pipelineFn[activeJob] : activeJob;
      return runJob.call(settings, res)
        .then(function (result) {
          Object.keys(result).forEach(function(resultKey) {
            res[resultKey] = result[resultKey];
          })          
          return res;
        })
    })
    .catch( function(err) {
      Promise.reject( new Error('Error in pipeline method', {activeJob:activeJob, 'details': err}) );
    });
  }, Promise.resolve({}))
}

function setup() {

}

function allLocalesOneFile(filename) {
  return settings.i18nConfigs.locales.reduce(function (acc, locale) {
    return acc.then(function (res) {
      return oneLocaleOneFile(filename, locale)
        .then(function (result) {
          res.push(result);
          return res;
        })
    })
  }, Promise.resolve([]))

  .catch( function(err) {
    Promise.reject( new Error('Error in pipeline method', {activeJob:activeJob, 'details': err}) );
  });
}

function setup() {
  i18nSetup.i18nSetup(settings);
}
function callAfterSetup(fn) {
  return function(...args) {
    setup();
    return fn(...args);
  }
}

function allLocalesAllFiles() {
  return fileUtls.glob('views', settings)
    .then(function(filesArray) {
    return filesArray.reduce(function (acc, filename) {

      return acc.then(function (res) {
        return allLocalesOneFile(filename)
          .then(function (result) {
            res[filename] = result;
            return res;
          })
      })
    }, Promise.resolve({}))
  })
  .catch( function(err) {
    Promise.reject( new Error('Error in pipeline method', {activeJob:activeJob, 'details': err}) );
  });
}

var publicAPI = {
  setOptions: function(options) {
    extend(true, settings, options);
    return publicAPI;
  },
  oneLocaleOneFile: callAfterSetup(oneLocaleOneFile),
  allLocalesOneFile: callAfterSetup(allLocalesOneFile),
  allLocalesAllFiles: callAfterSetup(allLocalesAllFiles)
}

module.exports = publicAPI;