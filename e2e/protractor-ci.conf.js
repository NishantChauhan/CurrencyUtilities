const config = require('./protractor.conf').config
const ciMultiBrowsers = require('./browserConfig').ciMultiBrowsers

config.multiCapabilities = ciMultiBrowsers
config.directConnect = true

exports.config = config
