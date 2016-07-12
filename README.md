#bmEmailTemplatizer
An email template engine that truely works.

- compile multiple emails templates with multiple locales.
- fully customizable pipeline.
- i18n and customizable locals
- consolidate.js for view engine.

##Usage
###Minimal
```javascript
var bmEmailTemplatizer = require('bm-email-templatizer');

bmEmailTemplatizer
  .allLocalesAllFiles()
  .then(function(results) {
    console.log('results', results);
  })
  .catch(function(err) {
    console.log('error', err);
  });
```

##API
###setOptions
  parameters: options object
  returns: bmEmailTemplatizer

<!--
###oneLocaleOneFile
  parameters: 
  returns: Promise
  resolves:

###allLocalesOneFile
  parameters: 
  returns: Promise
  resolves:
-->

###allLocalesAllFiles
  parameters: none.
  returns: Promise.
  resolves: pipeline resolves.


#Options

| Option              |   Type   |                                Description   |
| ------------------- | :------: | -------------------------------------------: |
| pipeline            | Array    | list of functions to be run by templatizer.  |
| paths               | Object   | See Paths section.                           |
| consolidate         | Object   | See Consolidate section.                     |
| i18nConfigurations  | Object   | See i18n configurations section.             |

```javascript
var defaulOptions = {
  pipeline: ['compilePug', 'compileSass', 'juiceStyles', 'writeHtml'],
  paths: {
    base: process.cwd(),
    scss: 'scss/index.scss',
    locales: 'locales/',
    views: 'views/**/*.pug',
    compiled: 'compiled'
  },
  consolidate: {
    viewEngine: 'pug',
    locals: {},
    options: {}
  }
}
```

## Consolidate
[consolidate.js](https://github.com/tj/consolidate.js) is used to support a HUGE list of view engines!

### Supported template engines by consolidate:

  - [atpl](https://github.com/soywiz/atpl.js)
  - [doT.js](https://github.com/olado/doT) [(website)](http://olado.github.io/doT/)
  - [dust (unmaintained)](https://github.com/akdubya/dustjs) [(website)](http://akdubya.github.com/dustjs/)
  - [dustjs-linkedin (maintained fork of dust)](https://github.com/linkedin/dustjs) [(website)](http://linkedin.github.io/dustjs/)
  - [eco](https://github.com/sstephenson/eco)
  - [ect](https://github.com/baryshev/ect) [(website)](http://ectjs.com/)
  - [ejs](https://github.com/visionmedia/ejs)
  - [haml](https://github.com/visionmedia/haml.js)
  - [haml-coffee](https://github.com/9elements/haml-coffee)
  - [hamlet](https://github.com/gregwebs/hamlet.js)
  - [handlebars](https://github.com/wycats/handlebars.js/) [(website)](http://handlebarsjs.com/)
  - [hogan](https://github.com/twitter/hogan.js) [(website)](http://twitter.github.com/hogan.js/)
  - [htmling](https://github.com/codemix/htmling)
  - [jade](https://github.com/visionmedia/jade) [(website)](http://jade-lang.com/)
  - [jazz](https://github.com/shinetech/jazz)
  - [jqtpl](https://github.com/kof/jqtpl)
  - [JUST](https://github.com/baryshev/just)
  - [liquor](https://github.com/chjj/liquor)
  - [lodash](https://github.com/bestiejs/lodash) [(website)](http://lodash.com/)
  - [mote](https://github.com/satchmorun/mote) [(website)](http://satchmorun.github.io/mote/)
  - [mustache](https://github.com/janl/mustache.js)
  - [nunjucks](https://github.com/mozilla/nunjucks) [(website)](https://mozilla.github.io/nunjucks)
  - [pug (formerly jade)](https://github.com/pugjs/pug) [(website)](http://jade-lang.com/)
  - [QEJS](https://github.com/jepso/QEJS)
  - [ractive](https://github.com/Rich-Harris/Ractive)
  - [react](https://github.com/facebook/react)
  - [slm](https://github.com/slm-lang/slm)
  - [swig](https://github.com/paularmstrong/swig) [(website)](http://paularmstrong.github.com/swig/)
  - [templayed](http://archan937.github.com/templayed.js/)
  - [twig](https://github.com/justjohn/twig.js)
  - [liquid](https://github.com/leizongmin/tinyliquid) [(website)](http://liquidmarkup.org/)
  - [toffee](https://github.com/malgorithms/toffee)
  - [underscore](https://github.com/documentcloud/underscore) [(website)](http://underscorejs.org/#template)
  - [vash](https://github.com/kirbysayshi/vash)
  - [walrus](https://github.com/jeremyruppel/walrus) [(website)](http://documentup.com/jeremyruppel/walrus/)
  - [whiskers](https://github.com/gsf/whiskers.js)

### consolidate.locals
Default: `{}`

view engine locals, can be used to add custom functions to be used while rendering the view.
example(rendering handlebar templates through jade):
```javascript
consolidate: {
  locals: {
    _raw: function(variableName) {
      return String.raw`${variableName}`;
    }
  }
}
```
```jade
//- jade view
html
  body
    div
      | #{ _raw("{{#if user_name}}") }
      div=__('welcome-message')
      | #{ _raw("{{/if}}") }
```

[node-i18n](https://github.com/mashpie/i18n-node) is automatically embedded to the view engine.

### consolidate.viewEngine
Default: `pug`
view engine, check

### consolidate.options
Default: `{}`
options sent to view engine

## Paths
###paths.base
Default: `process.cwd()`

base path of project.
By default it is the current working directory, the directory path node is called from.

###paths.scss
Default: `scss/index.scss`

Entrance point for scss file. Currently accepts only one entrance point.

###paths.views
Default: `views/**/*.pug`

`path.views` accept a glob pattern (relative or absolute).

###paths.locales
Default: `locales/`

`path.locales` accept a directory path (relative or absolute).

locales 
*Locale file name will be supplied as a directory name to the writeHTML pipeline command*

###paths.compiled
Default: `compiled`

Accepts a string for a folder name relative to the base path.
Used by `writeHtml` in the pipeline to write the compiled files into directory.
`{base}/{compiled}/{locale}/{fileName}.html

| Future: accepts an object, with absolute boolean, ext name, and folder path.


##Scss
To get the active locale in the scss files, use getActiveLocale();

example:
```sass
// index.scss
$language: getActiveLocale();
$direction: if($language == 'ar', rtl, ltr);

html {
  direction: $direction;
}

@if $language == 'du' {
  .test-class {
    color: blue;
  }
}
```
##i18n config
config options passed to node-i18n, [check here](https://github.com/mashpie/i18n-node#i18nconfigure)

if `i18nConfig.locales` is not passed, they are predicted based on json files in the `paths.locales` directory.

`i18nConfig.directory` and `i18nConfig.register` properties are ignored.
