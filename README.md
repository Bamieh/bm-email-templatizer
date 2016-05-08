#bm-email-templates







#Options



```javascript
var myOptions = {
  path: {
    'base': __dirname,
    'views': 'views'
  }
}

// setting options via options setter
bmTemplatizer.options = myOptions;
// passing options to compile methods
bmTemplatizer.compile(myOptions).then(/*...
```



##Options List

| Option   |   Type   |     Default |                     Description |
| -------- | :------: | ----------: | ------------------------------: |
| basePath | {String} | System Root |               Project base path |
| locales  | centered |             |                                 |
| paths    | {Object} |           - | See Paths section for more info |



## File Paths

| PathName |    Default    | Description |
| -------- | :-----------: | ----------: |
| base     | *System Root* | System Root |
| scss     |   *"scss"*    |             |
| views    |   *"views"*   |             |
| dest     |   *"dest"*    |             |
| locales  |  *"locales"*  |             |

