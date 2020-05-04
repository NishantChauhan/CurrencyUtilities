/* eslint-disable strict */
const config = require('./protractor.conf').config

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--no-sandbox', '--test-type', '--headless', '--disable-gpu', '--window-size=800x600'],
  },
}
config.directConnect = true
config.chromeDriver = '/usr/bin/chromedriver'
config.useAllAngular2AppRoots = true

exports.config = config
