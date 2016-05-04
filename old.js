var pug = require('pug'),
  path = require('path'),
  ejs = require('ejs'),
  fs = require('fs'),
  juice = require('juice'),
  sass = require('node-sass'),
  Promise = require('promise');

var emailTemplatizer = {
  defaults: {
  }, 
  init: function init(options) {
    // options = options || {};
    // for (var key in this.defaults) {
    //  if (options[key] === undefined) {
    //    options[key] = this.defaults[key];
    //  }
    // }
    var promise = new Promise(function (resolve, reject) {
      this.i18n = this.setLanguage();
      this.basePath = path.join(__dirname, options.rootFolder);
      this.locals = this.getLocals();
      this.filename = options.filename;

      resolve(this);
    }.bind(this));

    return promise;
  },
  setLanguage: function setLanguage() {
    return 'en';
  },
  getLocals: function() {
    var tranlationsPath = path.join(this.basePath, 'locales', this.i18n+'.json');
    return JSON.parse(fs.readFileSync(tranlationsPath, 'utf8'));
  },
  compileJade: function compileJade() {
    var promise = new Promise(function (resolve, reject) {
      
      var fullPath = path.join(this.basePath, 'views', this.filename+'.jade');
      var options = {};
      
      var fn = jade.compileFile(fullPath, options);
      this.html = fn(this.locals);
      resolve(this);
    }.bind(this));

    return promise;
  },
  compileScss: function compileScss(){
    var scssFile = path.join(this.basePath, 'scss', 'index.scss');
    var sassOptions = {
      file: scssFile,
      outputStyle: 'compressed'
    };

    var promise = new Promise(function (resolve, reject) {
      sass.render(sassOptions, function(error, result) {
        if (error) {
          reject(error);
          return;
        }
        this.css = result.css.toString();
        resolve(this);
      }.bind(this));
    }.bind(this));

    return promise;

  },
  inlineStyle: function inlineStyle() {
    var promise = new Promise(function (resolve, reject) {
      this.output = juice.inlineContent(this.html, this.css);
      resolve(this);
    }.bind(this));
    return promise;
  }
}
var options = {
  filename: 'test',
  rootFolder: 'email-templates'
}
// res.i18n(htmlFile, bindables)
//put into another object soon
emailTemplatizer.init(options)
  .then(bindedCall('compileJade'))
  .then(bindedCall('compileScss'))
  .then(bindedCall('inlineStyle'))
  .then(function(templatizer) {
    console.log(templatizer.output);
  })
  .catch(function(err) {
    console.log('error:', err);
  });

function bindedCall(fn) {
  return emailTemplatizer[fn].bind(emailTemplatizer);
}
