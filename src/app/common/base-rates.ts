export class ResponseStatus {
  status: string;
  errorCode?: string;
  errorDescription?: string;
}
export class ExchangeRateAPIReponse {
  from: string;
  to: string;
  rateAsOf: Date;
  amount: number;
  conversionRate: number;
  result: number;
  responseStatus: ResponseStatus;
}
