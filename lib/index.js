var extend = require('./extend-mixin');
// var scanDir = require('./scan-dir');

var pipelineFn = {
  compilePug   : require('./compile-pug'),
  compileSass  : require('./compile-sass'),
  juiceStyles  : require('./juice-styles'),
  renderHtml   : require('./render-html'),
  writeHtml    : require('./write-file'),
  filePaths    : require('./file-path')
};

var settings = {
  pipeline: ['compilePug', 'compileSass', 'juiceStyles', 'writeHtml'],
  paths: {
    base: '',
    scss: 'scss',
    locales: 'locales',
    views: 'views',
    compiled: 'compiled'
  }
}

var fs = require('fs'),
 path = require('path');

function scanDir(pathKey, manual) {
  var paths = this.paths;
  return new Promise(function(resolve, reject) {
    if(manual instanceof Array) return resolve(manual);
    if(typeof manual === "string") return resolve(manual.split(','));
    var filePath = path.join( paths.base, paths[pathKey] );
    fs.readdir(filePath, function(err, files) {
      if(err) return reject(err);
      return resolve(files);
    });
  });
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
  return scanDir.call(settings, 'locales', settings.locales)
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
    return scanDir.call(settings, 'views', settings.files)
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