const config = require('./protractor.conf').config
const ciMultiBrowsers = require('./browserConfig').ciMultiBrowsersWin

config.baseUrl = process.env.APP_URL
config.multiCapabilities = ciMultiBrowsers
exports.config = config
