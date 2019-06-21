import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConvertedCurrency, CurrencyConvertorInput } from '../common/currency-conversion';
import { ExchangeRateAPIReponse } from '../common/fixer-base-rates';
import { exchangeReponse } from '../mock-response/mock-reponse';
import { fixedTargetCurrency } from './../mock-response/mock-reponse';

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
        subscriber.next(this.nextExchangeRatesResponse());
      }, 2000);
    });
  }
  public nextExchangeRatesResponse(): ExchangeRateAPIReponse {
    const random = Math.floor(Math.random() * 100);
    exchangeReponse.rates[fixedTargetCurrency] = exchangeReponse.rates[fixedTargetCurrency] + random / 100;
    exchangeReponse.date = new Date().toString();
    return exchangeReponse;
  }
  // -----------------------------------------------------

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
