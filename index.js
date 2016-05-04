var compilePug = require('./lib/compile-pug'),
    errors     = require('./lib/errors'),
    localization     = require('./lib/localization'),
    compileSass     = require('./lib/compile-sass'),
    juiceStyles     = require('./lib/juice-styles'),
    renderHtml     = require('./lib/render-html'),
    writeFile     = require('./lib/write-file'),
    filePath     = require('./lib/file-path'),
    path = require('path'),
    extend     = require('./lib/extend-mixin').extend;

var Controller = {
  __defaults__: {
    pipeline: ['compilePug', 'compileSass', 'juiceStyles', 'writeHtml', 'renderHtml'],
    locales: ['en'],
    basePath : path.join(__dirname, 'example'),
  },
  get pipeline() {
    return this.__defaults__.pipeline;
  },
  set pipeline(pipeArray) {
    if( Array.isArray(pipeArray) ) {
      this.__defaults__.pipeline = pipeArray;
    } else {
      throw new Error(errors.pipelineArray)
    }
  },
  compile: function() {
    return this.__defaults__.pipeline.reduce(function (acc, activeJob) {
      return acc.then(function (res) {
        return this[activeJob].call(this, res[0])
          .then(function (result) {
            res[0] = (res[0])? extend(res[0], result) : result;
            return res;
          })
      }.bind(this))
      .catch( function(err) {console.log('err on', activeJob, err) } );
    }.bind(this), Promise.resolve([]))
  }
}

module.exports = extend(Controller, localization, compilePug, compileSass, juiceStyles, writeFile, renderHtml, filePath);
