import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { Currency, fixedTargetCurrency } from 'src/app/common/base-rates'
import { ConvertedCurrency } from 'src/app/common/currency-conversion'
import { environment } from 'src/environments/environment'
import { fixedSourceCurrency } from '../common/base-rates'
import { CurrencyConvertorInput } from '../common/currency-conversion'
import { mockStandaloneAPIKeyError, mockStandaloneSSLError } from './../mock-response/mock-response'
import { CurrencyUtilityFakeStandaloneErrorService } from './currency-utility-fake-standalone-error.service'
import { CurrencyUtilityService, CurrencyUtilityServiceInterface } from './currency-utility.service'

describe('CurrencyUtilityService Standalone Error ', () => {
  beforeEach(() => {
    environment.standalone = true
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  })

  it('should be created', () => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeStandaloneErrorService)
    expect(service).toBeTruthy()
  })
  it('should be handler error on supported currencies', done => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityFakeStandaloneErrorService)

    service.getAllSupportedCurrencies().subscribe(
      () => {},
      error => {
        expect(error).toBeTruthy()
        expect(error.errorCode).toBe(mockStandaloneAPIKeyError.error.type)
        done()
      }
    )
  })
  it('should handle error for converted currency', done => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeStandaloneErrorService)
    const inputCurrency: CurrencyConvertorInput = {
      sourceAmount: 1000,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
    }
    service.convertCurrency(inputCurrency).subscribe(
      () => {},
      error => {
        expect(error).toBeTruthy()
        expect(error.errorCode).toBe(mockStandaloneAPIKeyError.error.type)
        done()
      }
    )
  })
  it('should return mock response for https error for converted currency', done => {
    const fakeService: CurrencyUtilityFakeStandaloneErrorService = TestBed.inject(
      CurrencyUtilityFakeStandaloneErrorService
    )
    fakeService.error = mockStandaloneSSLError
    let supportedCurrencies: Currency[]
    fakeService.getAllSupportedCurrencies().subscribe(response => {
      supportedCurrencies = response
      expect(supportedCurrencies).toBeTruthy()
      expect(supportedCurrencies).toContain({
        currencyName: fixedSourceCurrency.currencySymbol,
        currencySymbol: fixedSourceCurrency.currencySymbol,
      })
      done()
    })
  })
  it('should return mock response for https error for converted currency', done => {
    const fakeService: CurrencyUtilityFakeStandaloneErrorService = TestBed.inject(
      CurrencyUtilityFakeStandaloneErrorService
    )
    fakeService.error = mockStandaloneSSLError
    const inputCurrency: CurrencyConvertorInput = {
      sourceAmount: 1000,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
    }
    let convertedCurrency: ConvertedCurrency
    fakeService.convertCurrency(inputCurrency).subscribe((result: ConvertedCurrency) => {
      convertedCurrency = result
    })
    expect(convertedCurrency).toBeTruthy()
    done()
  })

  afterEach(() => {
    environment.standalone = false
  })
})
