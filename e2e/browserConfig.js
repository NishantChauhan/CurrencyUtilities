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

const headlessChromeWin = {
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
const headlessFirefoxWin = {
  browserName: 'firefox',
  marionette: true,
  'moz:firefoxOptions': {
    args: ['--headless'],
    log: { level: 'trace' },
  },
}

const multiBrowsers = [chrome, firefox]
const ciMultiBrowsers = [headlessChrome, headlessFirefox]
const ciMultiBrowsersWin = [headlessChromeWin, headlessFirefoxWin]

module.exports = {
  chrome,
  headlessChrome,
  headlessChromeWin,
  firefox,
  headlessFirefox,
  headlessFirefoxWin,
  multiBrowsers,
  ciMultiBrowsers,
  ciMultiBrowsersWin,
}
