import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ConversionRateAPIResponse, Currency } from '../common/base-rates'
import { CurrencyUtilityService } from './currency-utility.service'
@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityErrorService extends CurrencyUtilityService {
  public getConvertedCurrencyFromAPI(): Observable<ConversionRateAPIResponse> {
    const httpError: any = {}
    const errorResponse: HttpErrorResponse = new HttpErrorResponse(httpError)
    return this.handleError(errorResponse)
  }
  public getAllSupportedCurrencies(): Observable<Currency[]> {
    const httpError: any = { error: { errorCode: 'Invalid Input', errorDescription: 'Currency Not Supported' } }
    const errorResponse: HttpErrorResponse = new HttpErrorResponse(httpError)
    return this.handleError(errorResponse)
  }
  public getProgressEventErrorOnSupportedCurrencies(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>('http://fakehost-currency-utilities.com/').pipe(catchError(this.handleError))
  }
}
