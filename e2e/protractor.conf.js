/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable strict */
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const { SpecReporter } = require('jasmine-spec-reporter')
const browserConfig = require('./browserConfig')
const jasmineReporters = require('jasmine-reporters')
const dateString = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-')
let reportDir
// For Reports Backup
const fs = require('fs-extra')
exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  multiCapabilities: browserConfig.multiBrowsers,
  suites: {
    sanity: ['./src/sanity/**/*e2e-spec.ts'],
    all: ['./src/**/*.e2e-spec.ts'],
  },
  directConnect: true,
  baseUrl: 'http://localhost:4000/',
  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {},
  },
  onPrepare: async function () {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json'),
    })

    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }))
    async function getBrowserName() {
      const caps = await browser.getCapabilities()
      const browserName = caps.get('browserName')
      return browserName
    }
    const browserName = await getBrowserName()
    reportDir = './reports/E2E/' + browserName + '/' + dateString
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: reportDir + '/xml',
        filePrefix: 'xmlOutput',
      })
    )

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status === 'failed') {
          browser.takeScreenshot().then(function (png) {
            const stream = fs.createWriteStream(reportDir + '/' + browserName + '-' + result.fullName + '.png')
            stream.write(new Buffer(png, 'base64'))
            stream.end()
          })
        }
      },
    })
  },

  onComplete: function () {
    let browserName
    let browserVersion
    const capsPromise = browser.getCapabilities()

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName')
      browserVersion = caps.get('version')
      platform = caps.get('platform')

      const HTMLReport = require('protractor-html-reporter-2')
      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: reportDir,
        outputFilename: browserName + '-index',
        screenshotPath: './',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform,
      }
      new HTMLReport().from(reportDir + '/xml/xmlOutput.xml', testConfig)
    })
  },
}
