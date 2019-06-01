import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConvertedCurrency, CurrencyConvertorInput } from './common/currency-conversion';
import { ExchangeRateAPIReponse } from './common/fixer-base-rates';

@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityService {
  constructor() {}

  public dummyRatesResponse(): ExchangeRateAPIReponse {
    return {
      success: true,
      timestamp: 1559124545,
      base: 'EUR',
      date: '2019-05-29',
      rates: {
        CAD: 1.507474,
        INR: 77.895765,
        USD: 1.115945,
      },
    };
  }
  public convertCurrency(input: CurrencyConvertorInput): Observable<ConvertedCurrency> {
    const apiResponse = this.dummyRatesResponse();
    const sourceRate = apiResponse.rates[input.sourceCurrency];
    const targetRate = apiResponse.rates[input.targetCurrency];
    const calculatedExchangeRate = targetRate / sourceRate;
    const calculatedAmount = input.sourceAmount * calculatedExchangeRate;

    const result: ConvertedCurrency = {
      sourceAmount: input.sourceAmount,
      sourceCurrency: input.sourceCurrency,
      targetAmount: calculatedAmount,
      targetCurrency: input.targetCurrency,
      exchangeRate: calculatedExchangeRate,
      exchangeResultDate: apiResponse.date,
    };
    return of(result);
  }
}
