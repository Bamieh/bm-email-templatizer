#bm-email-templates

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

###

#Options

```javascript
var defaulOptions = {
  pipeline: ['compilePug', 'compileSass', 'juiceStyles', 'writeHtml'],
  paths: {
    base: process.cwd(),
    scss: 'scss',
    locales: 'locales',
    views: 'views',
    compiled: 'compiled'
  }
}

```



##Options List

| Option   |   Type   |                                Description |
| -------- | :------: | -----------------------------------------: |
| pipeline | [Array]  | list of functions to be run by templatizer |
| paths    | {Object} | See Paths section for more info.           |


### File Paths

| PathName |    Default      |                Description  |
| -------- | :-------------: | --------------------------: |
| base     | *process.cwd()* | Directory node is run from. |
| scss     | *"scss"*        |                             |
| views    | *"views"*       |                             |
| compiled | *"compiled"*    |                             |
| locales  | *"locales"*     |                             |

