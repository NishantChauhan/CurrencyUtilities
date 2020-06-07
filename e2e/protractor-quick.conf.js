const config = require('./protractor.conf').config
const headlessChromeWin = require('./browserConfig').headlessChromeWin

config.multiCapabilities = [headlessChromeWin]
exports.config = config
