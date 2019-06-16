import { ExchangeRateAPIReponse } from '../common/fixer-base-rates';

export const mockReponse: ExchangeRateAPIReponse = {
  success: true,
  timestamp: 1559124545,
  base: 'EUR',
  date: '2019-06-07',
  rates: {
    CAD: 1.507474,
    INR: 77.895765,
    USD: 1.115945,
  },
};
