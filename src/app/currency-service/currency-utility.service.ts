import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map, shareReplay } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { ConversionRateAPIResponse, Currency, StandaloneAPIErrorResponse } from '../common/base-rates'
import { ConvertedCurrency, CurrencyConvertorInput } from '../common/currency-conversion'
import { ResponseStatus } from './../common/base-rates'
import { mockStandaloneResponse } from './../mock-response/mock-response'

export interface CurrencyUtilityServiceInterface {
  convertCurrency(input: CurrencyConvertorInput): Observable<ConvertedCurrency>
  getAllSupportedCurrencies(): Observable<Currency[]>
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityService implements CurrencyUtilityServiceInterface {
  supportedCurrencies$: Observable<Currency[]>
  conversionResponseCache$ = {}
  constructor(protected httpClient: HttpClient) {}

  public getAllSupportedCurrencies(): Observable<Currency[]> {
    if (this.supportedCurrencies$) {
      return this.supportedCurrencies$
    }
    this.supportedCurrencies$ = this.supportedCurrencyGetRequest().pipe(
      map(response => this.mapSupportedCurrencies(response)),
      shareReplay(1),
      catchError(httpError => {
        delete this.supportedCurrencies$
        return this.handleError(httpError)
      })
    )

    return this.supportedCurrencies$
  }

  protected supportedCurrencyGetRequest(): Observable<any> {
    return this.httpClient.get<any>(`${environment.supportedCurrencyURL}`)
  }
  protected mapSupportedCurrencies(response: any): Currency[] {
    let backendResponse: Currency[]
    if (environment.standalone) {
      if (response.error?.type === 'https_access_restricted') {
        response = mockStandaloneResponse
      }
      if (!response.error) {
        backendResponse = []
        backendResponse.push({ currencyName: response.base, currencySymbol: response.base })
        for (const property in response.rates) {
          const supportedCurrency: Currency = { currencyName: `${property}`, currencySymbol: `${property}` }
          backendResponse.push(supportedCurrency)
        }
        backendResponse = backendResponse.sort((src, trg) =>
          src.currencySymbol.localeCompare(trg.currencySymbol, 'en', { ignorePunctuation: true })
        )
      } else {
        throw new HttpErrorResponse(response)
      }
    } else {
      backendResponse = response
    }
    return backendResponse
  }

  public getConvertedCurrencyFromAPI(input: CurrencyConvertorInput): Observable<ConversionRateAPIResponse> {
    const key = input.sourceCurrency + '-' + input.targetCurrency
    const cachedResponse$ = this.conversionResponseCache$[key]
    if (this.cacheIsPresentAndUnexpired(cachedResponse$)) {
      this.conversionResponseCache$[key].value = cachedResponse$.value.pipe(
        map((response: ConversionRateAPIResponse) => {
          const newResponse: ConversionRateAPIResponse = { ...response }
          newResponse.result = response.conversionRate * input.sourceAmount
          newResponse.amount = input.sourceAmount
          return newResponse
        })
      )

      return this.conversionResponseCache$[key].value
    }

    const uriParams = `?Amount=${input.sourceAmount}&From=${input.sourceCurrency}&To=${input.targetCurrency}`

    const uri = environment.standalone
      ? `${environment.convertCurrencyURL}`
      : `${environment.convertCurrencyURL}${uriParams}`

    const conversionResponse = this.convertCurrencyGetRequest(uri).pipe(
      map(response => this.mapConversionResponse(input, response)),
      shareReplay(1),
      catchError(httpError => {
        delete this.conversionResponseCache$[key]
        return this.handleError(httpError)
      })
    )
    this.conversionResponseCache$[key] = { created: Date.now(), value: conversionResponse }
    return conversionResponse
  }
  private cacheIsPresentAndUnexpired(cachedResponse: any) {
    return cachedResponse && cachedResponse.created + environment.cacheExpiryTimeout > Date.now()
  }

  protected convertCurrencyGetRequest(uri: string): Observable<any> {
    return this.httpClient.get<any>(`${uri}`)
  }
  mapConversionResponse(input: CurrencyConvertorInput, response: any): ConversionRateAPIResponse {
    let backendResponse: ConversionRateAPIResponse
    if (environment.standalone) {
      if (response.error?.type === 'https_access_restricted') {
        response = mockStandaloneResponse
      }

      const source = input.sourceCurrency
      const target = input.targetCurrency
      const amount = input.sourceAmount

      if (!response.error) {
        response.rates[response.base] = 1
        const sourceRate = response.rates[source]
        const targetRate = response.rates[target]
        backendResponse = {
          from: source,
          to: target,
          amount: amount,
          conversionRate: targetRate / sourceRate,
          result: (amount * targetRate) / sourceRate,
          responseStatus: {
            status: 'Success',
          },
          rateAsOf: response.date,
        }
      } else {
        throw new HttpErrorResponse(response)
      }
    } else {
      backendResponse = response
    }
    return backendResponse
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
  protected handleError(error: any) {
    const errorResponse: ResponseStatus = new ResponseStatus()
    const isHTTPError = error instanceof HttpErrorResponse
    const httpError = isHTTPError ? error : undefined

    errorResponse.status = 'Failed'

    if (isHTTPError && httpError.error instanceof ProgressEvent) {
      errorResponse.errorCode = httpError.statusText
      errorResponse.errorDescription = 'Its not you, its us. We are working on fixing this for you.'
    } else if (isHTTPError && httpError.error) {
      if (httpError.error.code) {
        const standAloneError: StandaloneAPIErrorResponse = httpError.error
        errorResponse.errorCode = standAloneError.type
        errorResponse.errorDescription = standAloneError.info
      }
      if (httpError.error.errorCode && httpError.error.errorDescription) {
        errorResponse.errorCode = httpError.error.errorCode
        errorResponse.errorDescription = httpError.error.errorDescription
      }
    } else {
      errorResponse.errorCode = 'Unknown Error'
      errorResponse.errorDescription = 'Unknown Error'
    }

    return throwError(errorResponse)
  }
}
