import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConvertedCurrency, CurrencyConvertorInput } from '../common/currency-conversion';
import { ExchangeRateAPIReponse } from '../common/fixer-base-rates';
import { mockReponse } from '../mock-response/mock-reponse';

export interface ICurrencyUtilityService {
  convertCurrency(input: CurrencyConvertorInput): Observable<ConvertedCurrency>;
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityService implements ICurrencyUtilityService {
  constructor() {}
  exchangeRateAPI = this.getLatestRatesFromAPI();

  public getLatestRatesFromAPI(): Observable<ExchangeRateAPIReponse> {
    // Implement HTTP call
    return new Observable<ExchangeRateAPIReponse>(subscriber => {
      setTimeout(() => {
        subscriber.next(mockReponse);
      }, 2000);
    });
  }
  public convertCurrency(input: CurrencyConvertorInput): Observable<ConvertedCurrency> {
    return new Observable<ConvertedCurrency>(subscriber => {
      this.exchangeRateAPI.subscribe((apiResponse: ExchangeRateAPIReponse) => {
        const sourceRate = apiResponse.rates[input.sourceCurrency];
        const targetRate = apiResponse.rates[input.targetCurrency];
        const calculatedExchangeRate = targetRate / sourceRate;
        const calculatedAmount = input.sourceAmount * calculatedExchangeRate;
        subscriber.next({
          sourceAmount: input.sourceAmount,
          sourceCurrency: input.sourceCurrency,
          targetAmount: calculatedAmount,
          targetCurrency: input.targetCurrency,
          exchangeRate: calculatedExchangeRate,
          exchangeResultDate: apiResponse.date,
        });
      });
    });
  }
}
