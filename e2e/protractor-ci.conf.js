const config = require('./protractor.conf').config
const ciMultiBrowsers = require('./browserConfig').ciMultiBrowsers

config.capabilities = ciMultiBrowsers
config.directConnect = true
config.chromeDriver = '/usr/bin/chromedriver'
config.useAllAngular2AppRoots = true

exports.config = config
