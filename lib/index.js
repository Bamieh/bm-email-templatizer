var compilePug = require('./compile-pug'),
    localization     = require('./localization'),
    compileSass     = require('./compile-sass'),
    juiceStyles     = require('./juice-styles'),
    renderHtml     = require('./render-html'),
    writeFile     = require('./write-file'),
    filePaths     = require('./file-path'),
    extend     = require('./extend-mixin').extend;

var Controller = {
  __defaults__: {
    pipeline: ['compilePug', 'compileSass', 'juiceStyles', 'writeHtml', 'renderHtml'],
    locales: ['en']
  },
  __paths__: {
    base: '',
    scss: 'scss',
    locales: 'locales',
    views: 'views',
    compiled: 'compiled'
  },
  get options() {
    return this.__defaults__;
  },
  set options(options) {
    if(typeof options === 'object') {
      for (var key in options) {
        this.__defaults__[key] = options[key];
      }
    }
  },
  compile: function(options) {
    this.options = options;
    this.setPaths.call(this, this.options.paths);

    return this.options.pipeline.reduce(function (acc, activeJob) {
      return acc.then(function (res) {
        return this[activeJob].call(this, res[0])
          .then(function (result) {
            res[0] = (res[0]) ? extend(res[0], result) : result;
            return res;
          })
      }.bind(this))
      .catch( function(err) {console.log('err on', activeJob, err) } );
    }.bind(this), Promise.resolve([]))
  }
}

module.exports = extend(Controller, localization, compilePug, compileSass, juiceStyles, writeFile, renderHtml, filePaths);
