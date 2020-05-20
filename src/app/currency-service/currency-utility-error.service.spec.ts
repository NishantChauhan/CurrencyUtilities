import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { ResponseStatus } from './../common/base-rates'
import { CurrencyUtilityErrorService } from './currency-utility-error.service'
import { CurrencyUtilityFakeService } from './currency-utility-fake.service.'
import { CurrencyUtilityServiceInterface } from './currency-utility.service'

describe('CurrencyUtilityService Errors', () => {
  const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
    jasmine.clock().install()
  })

  it('should be created', () => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeService)
    expect(service).toBeTruthy()
  })
  it('should return Progress Event error', done => {
    const service: CurrencyUtilityErrorService = TestBed.inject(CurrencyUtilityErrorService)
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

  afterEach(() => {
    jasmine.clock().uninstall()
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
  })
})
