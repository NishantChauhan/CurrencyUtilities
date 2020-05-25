import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { Observable } from 'rxjs'
import { ConversionRateAPIResponse, Currency, fixedSourceCurrency, fixedTargetCurrency } from '../common/base-rates'
import { CurrencyConvertorInput } from '../common/currency-conversion'
import { exchangeResponse } from '../mock-response/mock-response'
import { environment } from './../../environments/environment'
import { ConvertedCurrency } from './../common/currency-conversion'
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
  it('should be return supported currencies', done => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityFakeService)
    let supportedCurrencies: Currency[]
    service.getAllSupportedCurrencies().subscribe(response => {
      supportedCurrencies = response
      expect(supportedCurrencies).toBeTruthy()
      expect(supportedCurrencies).toContain({
        currencyName: fixedSourceCurrency.currencySymbol,
        currencySymbol: fixedSourceCurrency.currencySymbol,
      })
      done()
    })
  })

  it('should be return cached supported currencies', done => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityFakeService)
    let supportedCurrencies: Currency[]
    service.getAllSupportedCurrencies().subscribe()
    service.getAllSupportedCurrencies().subscribe(response => {
      supportedCurrencies = response
      expect(supportedCurrencies).toBeTruthy()
      expect(supportedCurrencies).toContain({
        currencyName: fixedSourceCurrency.currencySymbol,
        currencySymbol: fixedSourceCurrency.currencySymbol,
      })
      done()
    })
  })

  it('should be return actual endpoint subscription for supported currencies backend API', () => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityService)

    const exchangeAPIEndpoint: Observable<Currency[]> = service.getAllSupportedCurrencies()
    expect(exchangeAPIEndpoint).toBeTruthy()
  })

  it('should be return actual endpoint subscription for conversion rate backend API', () => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityService)
    const inputCurrency: CurrencyConvertorInput = {
      sourceAmount: 1,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
    }

    const exchangeAPIEndpoint: Observable<ConversionRateAPIResponse> = service.getConvertedCurrencyFromAPI(
      inputCurrency
    )
    expect(exchangeAPIEndpoint).toBeTruthy()
  })

  it(
    'should be convert 1000 ' +
      fixedSourceCurrency.currencySymbol +
      ' to ' +
      exchangeResponse.result +
      ' ' +
      fixedTargetCurrency.currencySymbol +
      '',
    done => {
      const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeService)
      const inputCurrency: CurrencyConvertorInput = {
        sourceAmount: 1000,
        sourceCurrency: fixedSourceCurrency.currencySymbol,
        targetCurrency: fixedTargetCurrency.currencySymbol,
      }
      let convertedCurrency
      service.convertCurrency(inputCurrency).subscribe((result: ConvertedCurrency) => {
        convertedCurrency = result
      })
      expect(convertedCurrency).toBeTruthy()
      expect(convertedCurrency.targetAmount.toFixed(10)).toBe(
        (inputCurrency.sourceAmount * exchangeResponse.conversionRate).toFixed(10)
      )
      expect(convertedCurrency.targetCurrency).toBe(inputCurrency.targetCurrency)
      expect(convertedCurrency.sourceCurrency).toBe(inputCurrency.sourceCurrency)
      expect(convertedCurrency.sourceAmount).toBe(exchangeResponse.amount)
      done()
    }
  )

  it('should cache conversion result', () => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeService)
    const inputCurrency: CurrencyConvertorInput = {
      sourceAmount: 1000,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
    }
    let firstConvertedCurrency: ConvertedCurrency
    service
      .convertCurrency(inputCurrency)
      .subscribe((result: ConvertedCurrency) => {
        firstConvertedCurrency = result
      })
      .unsubscribe()
    expect(firstConvertedCurrency).toBeTruthy()
    jasmine.clock().tick(environment.cacheExpiryTimeout / 2)
    let secondConvertedCurrency: ConvertedCurrency
    service
      .convertCurrency(inputCurrency)
      .subscribe((result: ConvertedCurrency) => {
        secondConvertedCurrency = result
      })
      .unsubscribe()
    expect(secondConvertedCurrency).toBeTruthy()
    expect(secondConvertedCurrency.targetAmount.toFixed(10)).toBe(
      (inputCurrency.sourceAmount * exchangeResponse.conversionRate).toFixed(10)
    )
    expect(firstConvertedCurrency.exchangeRate).toEqual(secondConvertedCurrency.exchangeRate)
    expect(secondConvertedCurrency.targetCurrency).toBe(inputCurrency.targetCurrency)
    expect(secondConvertedCurrency.sourceCurrency).toBe(inputCurrency.sourceCurrency)
    expect(secondConvertedCurrency.sourceAmount).toBe(exchangeResponse.amount)
  })
  it('should update cache after cache expiry timeout', () => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeService)
    const inputCurrency: CurrencyConvertorInput = {
      sourceAmount: 1000,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
    }
    let firstConvertedCurrency: ConvertedCurrency
    service
      .convertCurrency(inputCurrency)
      .subscribe((result: ConvertedCurrency) => {
        firstConvertedCurrency = result
      })
      .unsubscribe()
    expect(firstConvertedCurrency).toBeTruthy()
    jasmine.clock().tick(environment.cacheExpiryTimeout * 2)
    let secondConvertedCurrency: ConvertedCurrency
    service
      .convertCurrency(inputCurrency)
      .subscribe((result: ConvertedCurrency) => {
        secondConvertedCurrency = result
      })
      .unsubscribe()
    expect(secondConvertedCurrency).toBeTruthy()
    expect(secondConvertedCurrency.targetAmount.toFixed(10)).toBe(
      (inputCurrency.sourceAmount * exchangeResponse.conversionRate).toFixed(10)
    )
    expect(firstConvertedCurrency.exchangeRate).not.toEqual(secondConvertedCurrency.exchangeRate)
    expect(secondConvertedCurrency.targetCurrency).toBe(inputCurrency.targetCurrency)
    expect(secondConvertedCurrency.sourceCurrency).toBe(inputCurrency.sourceCurrency)
    expect(secondConvertedCurrency.sourceAmount).toBe(exchangeResponse.amount)
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })
})
