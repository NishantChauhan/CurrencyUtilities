// eslint-disable-next-line @typescript-eslint/no-var-requires
const originalConfigFn = require('./karma.conf')
let properties = null
originalConfigFn({
  set: function (arg) {
    properties = arg
  },
})

properties.customLaunchers = {
  ChromeHeadlessNoSandBox: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox'],
  },
}

properties.browsers = ['ChromeHeadlessNoSandBox']

// export settings
module.exports = function (config) {
  config.set(properties)
}
