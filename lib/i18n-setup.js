var i18n = require("i18n"),
  path = require('path');

module.exports = {
  i18nSetup: function i18nSetup(settings) {
    settings = settings || this;

    i18n.configure({
      directory: path.join(settings.paths.base, settings.paths.locales),
      register: settings.consolidate.locals
    });

    settings.locales = settings.locales || Object.keys(settings.consolidate.locals.getCatalog());

  }
}