import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExchangeRateAPIReponse } from '../common/base-rates';
import {
  ConvertedCurrency,
  CurrencyConvertorInput
} from '../common/currency-conversion';

export interface ICurrencyUtilityService {
  convertCurrency(input: CurrencyConvertorInput): Observable<ConvertedCurrency>;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyUtilityService implements ICurrencyUtilityService {
  // constructor() {}
  constructor(private httpClient: HttpClient) {}
  public getLatestRatesFromAPI(
    input: CurrencyConvertorInput
  ): Observable<ExchangeRateAPIReponse> {
    const uriParams = `?Amount=${input.sourceAmount}&From=${input.sourceCurrency}&To=${input.targetCurrency}`;
    return this.httpClient.get<ExchangeRateAPIReponse>(
      `${environment.baseURL}currency/converter/convert${uriParams}`
    );
  }
  public convertCurrency(
    input: CurrencyConvertorInput
  ): Observable<ConvertedCurrency> {
    return new Observable<ConvertedCurrency>(subscriber => {
      this.getLatestRatesFromAPI(input).subscribe(
        (apiResponse: ExchangeRateAPIReponse) => {
          subscriber.next({
            sourceAmount: input.sourceAmount,
            sourceCurrency: input.sourceCurrency,
            targetAmount: apiResponse.result,
            targetCurrency: input.targetCurrency,
            exchangeRate: apiResponse.conversionRate,
            exchangeResultDate: apiResponse.rateAsOf
          });
        }
      );
    });
  }
}
