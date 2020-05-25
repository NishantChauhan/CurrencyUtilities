import { fixedTargetCurrency } from 'src/app/common/base-rates'
import { ConversionRateAPIResponse, Currency, fixedSourceCurrency } from '../common/base-rates'
import { secondCurrency } from './../common/base-rates'

export const mockSupportedCurrencies: Currency[] = [fixedSourceCurrency, fixedTargetCurrency, secondCurrency]
export const exchangeResponse: ConversionRateAPIResponse = {
  from: fixedSourceCurrency.currencySymbol,
  to: fixedTargetCurrency.currencySymbol,
  rateAsOf: new Date(),
  amount: 1000,
  conversionRate: 53.49008750820958,
  result: 53490.08750820958,
  responseStatus: {
    status: 'Success',
  },
}
export const mockStandaloneResponse = {
  success: true,
  timestamp: 1584093246,
  base: 'EUR',
  date: 'Mar 13, 2020, 12:00:00 AM',
  rates: {
    CAD: 1.540884,
    EUR: 1.0,
    INR: 82.42202,
    USD: 1.116595,
  },
}
export const mockStandaloneAPIKeyError = {
  success: false,
  error: {
    code: 101,
    type: 'invalid_access_key',
    info:
      'You have not supplied a valid API Access Key. [Technical Support: 4951964+NishantChauhan@users.noreply.github.com ]',
  },
}
export const mockStandaloneSSLError = {
  success: false,
  error: {
    code: 105,
    type: 'https_access_restricted',
    info: 'Access Restricted - Your current Subscription Plan does not support HTTPS Encryption.',
  },
}
