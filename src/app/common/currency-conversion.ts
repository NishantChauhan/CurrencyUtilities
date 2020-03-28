export class CurrencyConvertorInput {
  sourceAmount: number;
  sourceCurrency: string;
  targetCurrency: string;
}
export class ConvertedCurrency {
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  targetAmount: number;
  exchangeRate: number;
  exchangeResultDate: Date;
}
