export const environment = {
  production: true,
  standalone: false,
  supportedCurrencyURL: 'http://localhost:5000/api/v1/currency/rates/supportedCurrencies',
  convertCurrencyURL: 'http://localhost:5000/api/v1/currency/converter/convert',
  cacheExpiryTimeout: 60000 * 60,
}
