import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { ConversionRateAPIResponse, Currency } from '../common/base-rates'
import { CurrencyConvertorInput } from '../common/currency-conversion'
import { exchangeReponse, mockSupportedCurrencies } from '../mock-response/mock-reponse'
import { CurrencyUtilityService } from './currency-utility.service'
@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityFakeService extends CurrencyUtilityService {
  protected convertCurrencyGetRequest(input: CurrencyConvertorInput): Observable<ConversionRateAPIResponse> {
    return new Observable<ConversionRateAPIResponse>(subscriber => {
      setTimeout(() => {
        input
        subscriber.next(this.nextConversionRateResponse())
      }, 1000)
    })
  }
  public supportedCurrencyGetRequest(): Observable<Currency[]> {
    return of(mockSupportedCurrencies)
  }

  public nextConversionRateResponse(): ConversionRateAPIResponse {
    const random = Math.floor(Math.random() * 100)
    exchangeReponse.conversionRate = exchangeReponse.conversionRate + random / 100
    exchangeReponse.result = exchangeReponse.amount * exchangeReponse.conversionRate
    return exchangeReponse
  }
}
