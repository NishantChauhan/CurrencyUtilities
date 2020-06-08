/* eslint-disable strict */
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const dateString = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-')
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-spec-reporter'),
      require('karma-html-reporter'),
      require('@chiragrupani/karma-chromium-edge-launcher'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      combineBrowserReports: true,
      dir: require('path').join(__dirname, '../coverage/CurrencyUtilities'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      'report-config': {
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html',
        },
      },
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        // thresholds for all files
        global: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100,
        },
      },
    },
    reporters: ['kjhtml', 'spec', 'html'],

    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: false, // print the time elapsed for each spec
      failFast: false, // test would finish with error when a first fail occurs.
    },
    htmlReporter: {
      outputDir: './reports/UT/' + dateString + '/', // where to put the reports
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: false, // name files instead of creating sub-directories
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs

      // experimental
      preserveDescribeNesting: true, // folded suites stay folded
      foldAll: true, // reports start folded (only with preserveDescribeNesting)
    },

    port: 4002,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox', 'ChromeHeadless', 'Edge'],
    singleRun: false,
    restartOnFileChange: true,
  })
}
