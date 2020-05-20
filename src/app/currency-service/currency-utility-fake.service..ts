import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { startWith } from 'rxjs/operators'
import { ConversionRateAPIResponse, Currency } from '../common/base-rates'
import { CurrencyConvertorInput } from '../common/currency-conversion'
import { exchangeResponse, mockSupportedCurrencies } from '../mock-response/mock-response'
import { environment } from './../../environments/environment'
import { CurrencyUtilityService } from './currency-utility.service'
@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityFakeService extends CurrencyUtilityService {
  protected convertCurrencyGetRequest(input: CurrencyConvertorInput): Observable<ConversionRateAPIResponse> {
    return new Observable<ConversionRateAPIResponse>(subscriber => {
      setInterval(() => {
        input
        subscriber.next(this.nextConversionRateResponse())
      }, environment.cacheExpiryTimeout)
    }).pipe(startWith(exchangeResponse))
  }
  public supportedCurrencyGetRequest(): Observable<Currency[]> {
    return of(mockSupportedCurrencies)
  }

  public nextConversionRateResponse(): ConversionRateAPIResponse {
    const random = Math.floor(Math.random() * 100)
    exchangeResponse.conversionRate = exchangeResponse.conversionRate + random / 100
    exchangeResponse.result = exchangeResponse.amount * exchangeResponse.conversionRate
    return exchangeResponse
  }
}
