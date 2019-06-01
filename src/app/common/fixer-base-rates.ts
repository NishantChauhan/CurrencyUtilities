export class ExchangeRates {
  USD: number;
  CAD: number;
  INR: number;
}
export class ExchangeRateAPIReponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: ExchangeRates;
}
