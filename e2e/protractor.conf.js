/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable strict */
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
//const { SpecReporter } = require('jasmine-spec-reporter');
const jasmineReporters = require('jasmine-reporters');
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

const reportsDirectory = './reports/current';
const dashboardReportDirectory = reportsDirectory + '/dashboardReport';
const detailsReportDirectory = reportsDirectory + '/detailReport';

// For Reports Backup
// const fs = require('fs-extra');
// if (fs.existsSync(reportsDirectory)) {
//     const reportsBackupDirectory = './reports/backup_' + new Date().toJSON().replace(/:/g, '_');
//     fs.copySync(reportsDirectory, reportsBackupDirectory);
//   // fs.removeSync(reportsDirectory);
// }

const ScreenshotAndStackReporter = new HtmlScreenshotReporter({
  dest: detailsReportDirectory,
  filename: 'E2ETestingReport.html',
  reportTitle: 'E2E Testing Report',
  showSummary: true,
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: true,
});

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--no-sandbox',
        '--test-type',
        '--headless',
        '--disable-gpu',
        '--window-size=800x600',
      ],
    },
  },
  suites: {
    sanity: ['./src/sanity/**/*e2e-spec.ts'],
    all: ['./src/**/*.e2e-spec.ts'],
  },
  directConnect: true,
  chromeDriver: '/usr/bin/chromedriver',
  baseUrl: 'http://localhost:4000',
  useAllAngular2AppRoots: true,
  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {},
  },
  beforeLaunch: function() {
    return new Promise(function(resolve) {
      ScreenshotAndStackReporter.beforeLaunch(resolve);
    });
  },
  onPrepare: function() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json'),
    });
    // jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }))
    jasmine.getEnv().addReporter(ScreenshotAndStackReporter);
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: reportsDirectory + '/xml',
        filePrefix: 'xmlOutput',
      })
    );

    jasmine.getEnv().addReporter({
      specDone: function(result) {
        if (result.status === 'failed') {
          browser.getCapabilities().then(function(caps) {
            const browserName = caps.get('browserName');

            browser.takeScreenshot().then(function(png) {
              const stream = fs.createWriteStream(
                dashboardReportDirectory +
                  '/' +
                  browserName +
                  '-' +
                  result.fullName +
                  '.png'
              );
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      },
    });
  },

  onComplete: function() {
    let browserName;
    let browserVersion;
    const capsPromise = browser.getCapabilities();

    capsPromise.then(function(caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      const HTMLReport = require('protractor-html-reporter-2');
      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: dashboardReportDirectory,
        outputFilename: 'index',
        screenshotPath: './',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform,
      };
      new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
    });
  },
};
