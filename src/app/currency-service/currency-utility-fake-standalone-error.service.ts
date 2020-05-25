import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { mockStandaloneAPIKeyError } from './../mock-response/mock-response'
import { CurrencyUtilityService } from './currency-utility.service'
@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityFakeStandaloneErrorService extends CurrencyUtilityService {
  public error = mockStandaloneAPIKeyError
  protected convertCurrencyGetRequest(): Observable<any> {
    return of(this.error)
  }
  public supportedCurrencyGetRequest(): Observable<any> {
    return of(this.error)
  }
}
