import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { ConversionRateAPIResponse, Currency } from '../common/base-rates'
import { ConvertedCurrency, CurrencyConvertorInput } from '../common/currency-conversion'
import { ResponseStatus } from './../common/base-rates'

export interface CurrencyUtilityServiceInterface {
  convertCurrency(input: CurrencyConvertorInput): Observable<ConvertedCurrency>
  getAllSupportedCurrencies(): Observable<Currency[]>
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityService implements CurrencyUtilityServiceInterface {
  // constructor() {}
  constructor(private httpClient: HttpClient) {}

  public getAllSupportedCurrencies(): Observable<Currency[]> {
    const uri = 'currency/rates/supportedCurrencies'
    return this.httpClient.get<Currency[]>(`${environment.backendURL}${uri}`).pipe(
      // retry(3),
      catchError(this.handleError)
    )
  }

  public getConvertedCurrencyFromAPI(input: CurrencyConvertorInput): Observable<ConversionRateAPIResponse> {
    const uriParams = `?Amount=${input.sourceAmount}&From=${input.sourceCurrency}&To=${input.targetCurrency}`
    return this.httpClient
      .get<ConversionRateAPIResponse>(`${environment.backendURL}currency/converter/convert${uriParams}`)
      .pipe(
        // retry(3),
        catchError(this.handleError)
      )
  }
  public convertCurrency(input: CurrencyConvertorInput): Observable<ConvertedCurrency> {
    return new Observable<ConvertedCurrency>(subscriber => {
      this.getConvertedCurrencyFromAPI(input).subscribe(
        (apiResponse: ConversionRateAPIResponse) => {
          subscriber.next({
            sourceAmount: input.sourceAmount,
            sourceCurrency: input.sourceCurrency,
            targetAmount: apiResponse.result,
            targetCurrency: input.targetCurrency,
            exchangeRate: apiResponse.conversionRate,
            exchangeResultDate: apiResponse.rateAsOf,
          })
        },
        error => {
          subscriber.error(error)
        }
      )
    })
  }
  private handleError(httpError: HttpErrorResponse) {
    const errorResponse: ResponseStatus = new ResponseStatus()

    if (httpError.error instanceof ErrorEvent) {
      errorResponse.status = 'Failed'
      errorResponse.errorCode = httpError.statusText.toString()
      errorResponse.errorDescription = httpError.message
    }

    if (httpError.error instanceof ProgressEvent) {
      errorResponse.status = 'Failed'
      errorResponse.errorCode = httpError.statusText
      errorResponse.errorDescription = 'Its not you, its us. We are working on fixing this for you.'
    } else {
      console.error(`Backend returned code ${httpError.status}, ` + `body was: ${httpError.error}`)
      errorResponse.status = 'Failed'
      errorResponse.errorCode = httpError.error.errorCode
      errorResponse.errorDescription = httpError.error.errorDescription
    }

    return throwError(errorResponse)
  }
}
