const config = require('./protractor.conf').config
const ciMultiBrowsers = require('./browserConfig').ciMultiBrowsersWin

config.baseUrl = 'https://currency-utility-app.herokuapp.com/'
config.multiCapabilities = ciMultiBrowsers
exports.config = config
