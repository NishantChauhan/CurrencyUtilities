import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { Observable } from 'rxjs'
import { ConversionRateAPIResponse, Currency } from '../common/base-rates'
import { ConvertedCurrency, CurrencyConvertorInput } from '../common/currency-conversion'
import { exchangeReponse } from '../mock-response/mock-reponse'
import { ResponseStatus } from './../common/base-rates'
import { CurrencyUtilityErrorService } from './currency-utility-error.service'
import { CurrencyUtilityFakeService } from './currency-utility-fake.service.'
import { CurrencyUtilityService, CurrencyUtilityServiceInterface } from './currency-utility.service'

describe('CurrencyUtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
    jasmine.clock().install()
  })

  it('should be created', () => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeService)
    expect(service).toBeTruthy()
  })
  it('should be convert 1000 CAD to ' + exchangeReponse.result + ' INR', done => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeService)
    const inputCurrency: CurrencyConvertorInput = {
      sourceAmount: 1000,
      sourceCurrency: 'CAD',
      targetCurrency: 'INR',
    }
    let convertedCurrency
    service.convertCurrency(inputCurrency).subscribe((result: ConvertedCurrency) => {
      convertedCurrency = result
    })
    jasmine.clock().tick(3000)
    expect(convertedCurrency).toBeTruthy()
    expect(convertedCurrency.targetAmount.toFixed(10)).toBe(
      (inputCurrency.sourceAmount * exchangeReponse.conversionRate).toFixed(10)
    )
    expect(convertedCurrency.targetCurrency).toBe(inputCurrency.targetCurrency)
    expect(convertedCurrency.sourceCurrency).toBe(inputCurrency.sourceCurrency)
    expect(convertedCurrency.sourceAmount).toBe(exchangeReponse.amount)
    done()
  })

  it('should be return supported currencies', done => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityFakeService)
    let supportedCurrencies: Currency[]
    service.getAllSupportedCurrencies().subscribe(response => {
      supportedCurrencies = response
      expect(supportedCurrencies).toBeTruthy()
      expect(supportedCurrencies).toContain({
        currencyName: 'CAD',
        currencySymbol: 'CAD',
      })
      done()
    })
  })

  it('should be return actual endpoint subscription for conversion rate backend API', () => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityService)
    const inputCurrency: CurrencyConvertorInput = {
      sourceAmount: 1,
      sourceCurrency: 'CAD',
      targetCurrency: 'INR',
    }

    const exchangeAPIendpoint: Observable<ConversionRateAPIResponse> = service.getConvertedCurrencyFromAPI(
      inputCurrency
    )
    expect(exchangeAPIendpoint).toBeTruthy()
  })
  it('should return Progress Event error', done => {
    const service: CurrencyUtilityErrorService = TestBed.inject(CurrencyUtilityErrorService)
    let errorResponse: ResponseStatus
    service.getProgressEventErrorOnSupportedCurrencies().subscribe(
      response => {
        response
      },
      error => {
        jasmine.clock().tick(3000)
        errorResponse = error
        expect(errorResponse).toBeTruthy()
        expect(errorResponse.errorCode).toBe('Unknown Error')
        done()
      }
    )
  })
  it('should return Backend error', done => {
    const service: CurrencyUtilityErrorService = TestBed.inject(CurrencyUtilityErrorService)
    let errorResponse: ResponseStatus
    service.getAllSupportedCurrencies().subscribe(
      response => {
        response
      },
      error => {
        errorResponse = error
        expect(errorResponse).toBeTruthy()
        done()
      }
    )
  })
  it('should be return actual endpoint subscription for supported currencies backend API', () => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityService)

    const exchangeAPIendpoint: Observable<Currency[]> = service.getAllSupportedCurrencies()
    expect(exchangeAPIendpoint).toBeTruthy()
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })
})
