var extend = require('./extend-mixin'),
  scanDir = require('./scan-dir');

var pipelineFn = {
  compilePug   : require('./compile-pug'),
  compileSass  : require('./compile-sass'),
  juiceStyles  : require('./juice-styles'),
  renderHtml   : require('./render-html'),
  writeHtml    : require('./write-file')
};

var settings = {
  pipeline: ['compilePug', 'compileSass', 'juiceStyles', 'writeHtml'],
  paths: {
    base: process.cwd(),
    scss: 'scss/index.scss',
    locales: 'locales/**/*.json',
    views: 'views/**/*.pug',
    compiled: 'compiled'
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
    .catch( function(err) {console.log('err on', activeJob, err) } );
  }, Promise.resolve({}))
}

function allLocalesOneFile(filename) {
  return scanDir.glob('locales', settings)
    .then(function(localesArray) {
    return localesArray.reduce(function (acc, locale) {
      return acc.then(function (res) {
        return oneLocaleOneFile(filename, locale)
          .then(function (result) {
            res.push(result);
            return res;
          })
      })
    }, Promise.resolve([]))
  })
  .catch( function(err) {console.log('err:', err) } );
}

function allLocalesAllFiles() {
    return scanDir.glob('views', settings)
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
  .catch( function(err) {console.log('err:', err) } );
}

var publicAPI = {
  setOptions: function(options) {
    extend(true, settings, options);
    return publicAPI;
  },
  oneLocaleOneFile: oneLocaleOneFile,
  allLocalesOneFile: allLocalesOneFile,
  allLocalesAllFiles: allLocalesAllFiles
}

module.exports = publicAPI;