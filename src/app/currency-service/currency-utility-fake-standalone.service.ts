import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { mockStandaloneResponse } from './../mock-response/mock-response'
import { CurrencyUtilityService } from './currency-utility.service'
@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityFakeStandaloneService extends CurrencyUtilityService {
  protected convertCurrencyGetRequest(): Observable<any> {
    return of(mockStandaloneResponse)
  }
  public supportedCurrencyGetRequest(): Observable<any> {
    return of(mockStandaloneResponse)
  }
}
