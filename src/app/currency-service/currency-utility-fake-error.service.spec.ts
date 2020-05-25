import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { ResponseStatus } from './../common/base-rates'
import { CurrencyUtilityFakeErrorService } from './currency-utility-fake-error.service'
import { CurrencyUtilityServiceInterface } from './currency-utility.service'

describe('CurrencyUtilityService Fake Errors', () => {
  const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
    jasmine.clock().install()
  })

  it('should be created', () => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeErrorService)
    expect(service).toBeTruthy()
  })
  it('should return Progress Event error', done => {
    const service: CurrencyUtilityFakeErrorService = TestBed.inject(CurrencyUtilityFakeErrorService)
    let errorResponse: ResponseStatus
    service.getProgressEventErrorOnSupportedCurrencies().subscribe(
      response => {
        response
      },
      error => {
        errorResponse = error
        expect(errorResponse).toBeTruthy()
        expect(errorResponse.errorCode).toBe('Unknown Error')
        done()
      }
    )
  })
  it('should return Backend error for Supported Currency', done => {
    const service: CurrencyUtilityFakeErrorService = TestBed.inject(CurrencyUtilityFakeErrorService)
    let errorResponse: ResponseStatus
    service.getAllSupportedCurrencies().subscribe(
      () => {},
      error => {
        errorResponse = error
        expect(errorResponse).toBeTruthy()
        done()
      }
    )
  })
  it('should return Backend error for Convert Currency', done => {
    const service: CurrencyUtilityFakeErrorService = TestBed.inject(CurrencyUtilityFakeErrorService)
    let errorResponse: ResponseStatus
    service.convertCurrencyGetRequest().subscribe(
      () => {},
      error => {
        errorResponse = error
        expect(errorResponse).toBeTruthy()
        done()
      }
    )
  })

  afterEach(() => {
    jasmine.clock().uninstall()
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
  })
})
