import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConversionRateAPIResponse, Currency } from '../common/base-rates';
import {
  ConvertedCurrency,
  CurrencyConvertorInput
} from '../common/currency-conversion';

export interface ICurrencyUtilityService {
  convertCurrency(input: CurrencyConvertorInput): Observable<ConvertedCurrency>;
  getAllSupportedCurrencies(): Observable<Currency[]>;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyUtilityService implements ICurrencyUtilityService {
  // constructor() {}
  constructor(private httpClient: HttpClient) {}

  public getAllSupportedCurrencies(): Observable<Currency[]> {
    const uri = `currency/rates/supportedCurrencies`;
    return this.httpClient.get<Currency[]>(`${environment.baseURL}${uri}`);
  }

  public getConvertedCurrencyFromAPI(
    input: CurrencyConvertorInput
  ): Observable<ConversionRateAPIResponse> {
    const uriParams = `?Amount=${input.sourceAmount}&From=${input.sourceCurrency}&To=${input.targetCurrency}`;
    return this.httpClient.get<ConversionRateAPIResponse>(
      `${environment.baseURL}currency/converter/convert${uriParams}`
    );
  }
  public convertCurrency(
    input: CurrencyConvertorInput
  ): Observable<ConvertedCurrency> {
    return new Observable<ConvertedCurrency>(subscriber => {
      this.getConvertedCurrencyFromAPI(input).subscribe(
        (apiResponse: ConversionRateAPIResponse) => {
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
