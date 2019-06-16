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

  // To be Removed after implementing HTTP call
  public getLatestRatesFromAPI(): Observable<ExchangeRateAPIReponse> {
    // Implement HTTP Call
    return new Observable<ExchangeRateAPIReponse>(subscriber => {
      setTimeout(() => {
        subscriber.next(this.nextMockResponse());
      }, 2000);
    });
  }
  public nextMockResponse(): ExchangeRateAPIReponse {
    let random = Math.floor(Math.random() * 100);
    mockReponse.rates['INR'] = mockReponse.rates['INR'] + random / 100;
    mockReponse.date = new Date().toString();
    return mockReponse;
  }
  //-----------------------------------------------------

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
