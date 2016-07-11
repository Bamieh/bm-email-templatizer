var i18n = require("i18n"),
  path = require('path');

module.exports = {
  i18nSetup: function i18nSetup(settings) {
    settings = settings || this;

    settings.i18nConfigs.directory = path.join(settings.paths.base, settings.paths.locales);
    settings.i18nConfigs.register = settings.consolidate.locals;
    
    i18n.configure(settings.i18nConfigs);
    
    settings.i18nConfigs.locales = (settings.i18nConfigs.locales.length > 0)?
      settings.i18nConfigs.locales :
      Object.keys(settings.consolidate.locals.getCatalog());

  }
}