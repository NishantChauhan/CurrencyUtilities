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
