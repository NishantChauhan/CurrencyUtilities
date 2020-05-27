// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  standalone: false,
  supportedCurrencyURL: 'http://localhost:5000/api/v1/currency/rates/supportedCurrencies',
  convertCurrencyURL: 'http://localhost:5000/api/v1/currency/converter/convert',
  cacheExpiryTimeout: 10000,
}
// export const environment = {
//   production: false,
//   standalone: true,
//   supportedCurrencyURL: 'http://localhost:5000/latest?access_key=0',
//   convertCurrencyURL: 'http://localhost:5000/latest?access_key=0',
//   // supportedCurrencyURL: 'http://data.fixer.io/api/latest?access_key=0',
//   // convertCurrencyURL: 'http://data.fixer.io/api/latest?access_key=0',

//   cacheExpiryTimeout: 60000 * 60,
// }

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
