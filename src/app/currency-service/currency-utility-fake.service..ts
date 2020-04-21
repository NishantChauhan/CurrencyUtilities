import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConversionRateAPIResponse, Currency } from '../common/base-rates';
import {
  exchangeReponse,
  mockSupportedCurrencies
} from '../mock-response/mock-reponse';
import { CurrencyUtilityService } from './currency-utility.service';
@Injectable({
  providedIn: 'root'
})
export class CurrencyUtilityFakeService extends CurrencyUtilityService {
  public getConvertedCurrencyFromAPI(): Observable<ConversionRateAPIResponse> {
    return new Observable<ConversionRateAPIResponse>(subscriber => {
      setTimeout(() => {
        subscriber.next(this.nextConversionRateResponse());
      }, 2000);
    });
  }
  public getAllSupportedCurrencies(): Observable<Currency[]> {
    return of(mockSupportedCurrencies);
  }

  public nextConversionRateResponse(): ConversionRateAPIResponse {
    const random = Math.floor(Math.random() * 100);
    exchangeReponse.to = exchangeReponse.from + random / 100;
    return exchangeReponse;
  }
}
