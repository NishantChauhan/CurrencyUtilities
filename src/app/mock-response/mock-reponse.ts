import { ExchangeRateAPIReponse } from '../common/base-rates';

export const fixedSourceCurrency = 'CAD';
export const fixedTargetCurrency = 'INR';

export const exchangeReponse: ExchangeRateAPIReponse = {
  from: 'CAD',
  to: 'INR',
  rateAsOf: new Date(),
  amount: 1,
  conversionRate: 53.49008750820958,
  result: 53.49008750820958,
  responseStatus: {
    status: 'Success'
  }
};
