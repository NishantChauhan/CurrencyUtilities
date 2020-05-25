export const environment = {
  production: true,
  standalone: false,
  supportedCurrencyURL: 'https://currency-utilities.herokuapp.com/api/v1/currency/rates/supportedCurrencies',
  convertCurrencyURL: 'https://currency-utilities.herokuapp.com/api/v1/currency/converter/convert',
  cacheExpiryTimeout: 60000 * 60,
}
