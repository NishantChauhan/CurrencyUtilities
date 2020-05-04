import { ConversionRateAPIResponse, Currency } from '../common/base-rates'

export const mockSupportedCurrencies: Currency[] = [
  { currencyName: 'CAD', currencySymbol: 'CAD' },
  { currencyName: 'INR', currencySymbol: 'INR' },
  { currencyName: 'USD', currencySymbol: 'USD' },
]
export const exchangeReponse: ConversionRateAPIResponse = {
  from: 'CAD',
  to: 'INR',
  rateAsOf: new Date(),
  amount: 1000,
  conversionRate: 53.49008750820958,
  result: 53490.08750820958,
  responseStatus: {
    status: 'Success',
  },
}
