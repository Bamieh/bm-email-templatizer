#bmEmailTemplatizer
Fully working email templatizer.
- compile multiple emails templates with multiple locales.
- fully customizable pipeline.

##Usage

###Minimal
```javascript
var bmEmailTemplatizer = require('bm-email-templatizer');

bmEmailTemplatizer
  .allLocalesAllFiles()
  .then(function(results) {
    console.log('res', results);
  })
  .catch(function(err) {
    console.log('error', err);
  });
```

#Options

| Option   |   Type   |                                Description |
| -------- | :------: | -----------------------------------------: |
| pipeline | Array    | list of functions to be run by templatizer |
| paths    | Object   | See Paths section for more info.           |

```javascript
var defaulOptions = {
  pipeline: ['compilePug', 'compileSass', 'juiceStyles', 'writeHtml'],
  paths: {
    base: process.cwd(),
    scss: 'scss/index.scss',
    locales: 'locales/**/*.json',
    views: 'views/**/*.pug',
    compiled: 'compiled'
  }
}
```

## Paths
###base
Default: `process.cwd()`

base path of project.
By default it is the current working directory, the directory path node is called from.

###scss
Default: `scss/index.scss`

Entrance point for scss file. Currently accepts only one entrance point.

###views
Default: `views/**/*.pug`

views glob pattern relative to root.

###locales
Default: `locales/**/*.json`

locales glob pattern relative to root.
*Locale file name will be supplied as a directory name to the writeHTML pipeline command*

###compiled
Default: `compiled`

Accepts a string for a folder name relative to the base path.
Used by `writeHtml` in the pipeline to write the compiled files into directory.
`{base}/{compiled}/{locale}/{fileName}.html

| Future: accepts an object, with absolute boolean, ext name, and folder path.



