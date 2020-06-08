const config = require('./protractor.conf').config
const selectedBrowser = require('./browserConfig').headlessChromeWin

config.multiCapabilities = [selectedBrowser]
exports.config = config
