# Project Information

## Developer Norms

Developer norms are a necessary way to set some ground rules, so your code base can retain some consistency, remain maintainable over the next days, months and years and all developers are on the same page.

Here's a starter list of developer norms:

1. Don't over-engineer. Write minimum code to get things working end to end, only then iterate to improve,
2. Use a Continuous Integration server,
3. Always push working code, if you break the pipeline/build then fix it,
4. Make granular and small commits, per feature or per bug fix,
5. Provide descriptive commit messages,
6. Write self documenting code. Use descriptive variable and function names. Avoid unnecessary name shortening,
7. Don't leave dead/commented out code behind. If you see such code, delete it,
8. Write automated tests to cover critical integration points and functionality.

## Detailed Change Log

* 2019-05-28 15:14:47 - Enabled Debug for Unit Test, Local Server and E2E Tests.

* 2019-05-29 19:36:53 - New Branch for Currency Convertor Created.

* 2019-05-31 07:43:32 - Conversion Feature Changes

  * Currency Convertor Card
    1. Source Currency and Source Amount, Target Currency and Target Amount, Convert button.
    2. Click of Convert button text calls conversion service.
    3. Conversion service returns converted Target amount based on source amount and currencies.
  * Add ons
    1. Convert button shows the "Convert source currency to target currency"
    2. When source or target currency is changed the button text is also changed based on currency.
    3. While conversion is running the Target amount is disabled and button shows "Converting..." as text.
    4. Validation that source amount is mandatory. Border turn solid red.

* 2019-06-01 16:48:36 - Basic Testing

  * Updates
    1. npm test and npm e2e passed
    2. Added Common Data Types to pass data between components
    3. basic validation and conversion working

* 2019-06-02 10:24:33 - Additional Test Setup

  * Updates
    1. Added Observable for get Latest Rates API
    2. Added Fake Currency Utility Service and time out
    3. Added Test for service using Fake Service
    4. Added timeout in unit test. UT passed for convert currency.

* 2019-06-05 08:41:33 - Added Test Suite

  * Updates
    1. Completed E2E sanity flows
    2. Added Suite for basic sanity

* 2019-06-06 07:24:39 - Added Validators

  * Updates
    1. Added validators for source amount and target amount.
    2. Added 2 point precision for target amount.

* 2019-06-12 07:27:44 - Update child component with changes in source and target Amount on type

* 2019-06-16 01:13:34 - Fixed Code Coverage and E2E sanity

* 2020-03-29 11:22:49 - Integrated Angular FE with Spring boot BE

  * Updates
    1. Updated mock responses
    2. HttpClientModuleSupport, E2E test and UT modified
    3. Minor bug fixes - 0 INR (target currency.
    4. All E2E and UT tests successfully completed.

* 2020-04-03 09:19:00 - Created Jenkins Pipeline with following changes.

  * Updates
    1. Jenkinsfile to add pipeline with Build, Test and Deliver Stages
    2. Modified Karma to support ChromeHeadless No Sandbox test on alpine linux
    3. Formatting changes - removed editor config and prettier made default
    4. Added standardize to the build scripts

* 2020-04-15 08:19:00 - Added Support for Docker

  * Updates
    1. Created docker file to include the test and build phases
    2. Removed Build and Test phases as it is controlled by Docker build

* 2020-04-19 18:04:24 - Separated E2E protractor config for ci and local environment

  * Updates
    1. Added nginx configuration
    2. Added ci-e2e configuration in package.json

* 2020-04-21 08:54:35 - Added Support for all currencies

  * Updates
    1. New endpoint exposed by backend API to get supported currencies.
    2. Displayed all supported currencies in the dropdown

* 2020-04-29 09:08:18 - Added Error handling support

  * Updates
    1. Added Convertor Error Component for backend error response
    2. Implemented unit specs for success and error alerts for convertor card.

* 2020-05-09 09:35:50 - Upgraded Design with Angular Material

  * Design Changes
    1. Added custom theme
    2. Replaced currency icon
    3. Converted to widget form
    4. Autocomplete for currency selection with filter
    5. Removed the target amount input control and moved to view child
    6. Side Navigation Bar
    7. Updated About page
  * Bug Fixes
    1. Update test for mock response to use 1000 instead of 1
    2. More fixes for devalued currencies
    3. Trailing 0 after decimal removed
    4. Converted tests from sync to async for asynchronous code
    5. prettier end of line as 'auto' to avoid issues with CRLF.
  * Improvements
    1. Moved common testing modules to a file.
    2. Prettier and Eslint integration.
    3. Added lint staged plugin and pre-commit hook.
    4. Expected Conditions in protractor for waiting for page loads
    5. Added tests for convertor card error page

* 2020-05-17 07:01:41 - Added cache handling to avoid duplicate requests to back end api

  * Updates
    1. Code will replay the last response is successful.
    2. The server request for currency conversion will not be made until cacheExpiryTimeout
  * Enhancement
    1. Enabled spell checker
    2. Upgraded Angular Dependencies
    3. Added Async Validator for supported Currencies
  * Defects
    1. Fixed alignment on Firefox for mat-card-actions
    2. Mocked Mat Icon Module to remove errors in UT
