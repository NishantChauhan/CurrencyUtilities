const chrome = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['disable-infobars'],
  },
}

const headlessChrome = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--no-sandbox', '--test-type', '--headless', '--disable-gpu', '--window-size=800x600'],
  },
}

const firefox = {
  browserName: 'firefox',
  marionette: true,
  'moz:firefoxOptions': {
    log: { level: 'trace' },
  },
}
const headlessFirefox = {
  browserName: 'firefox',
  marionette: true,
  'moz:firefoxOptions': {
    args: ['--headless'],
    log: { level: 'trace' },
    binary: '/usr/bin/firefox',
  },
}

const multiBrowsers = [chrome, firefox]
const ciMultiBrowsers = [headlessChrome, headlessFirefox]

module.exports = {
  chrome,
  headlessChrome,
  firefox,
  headlessFirefox,
  multiBrowsers,
  ciMultiBrowsers,
}
