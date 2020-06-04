const config = require('./protractor.conf').config
const ciMultiBrowsers = require('./browserConfig').ciMultiBrowsers

config.multiCapabilities = ciMultiBrowsers
config.directConnect = true
config.chromeDriver = '/usr/bin/chromedriver'
config.useAllAngular2AppRoots = true

exports.config = config
