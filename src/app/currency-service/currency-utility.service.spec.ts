import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { Observable } from 'rxjs'
import { ConversionRateAPIResponse, Currency } from '../common/base-rates'
import { CurrencyConvertorInput } from '../common/currency-conversion'
import { exchangeReponse } from '../mock-response/mock-reponse'
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
        currencyName: 'CAD',
        currencySymbol: 'CAD',
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
        currencyName: 'CAD',
        currencySymbol: 'CAD',
      })
      done()
    })
  })

  it('should be return actual endpoint subscription for supported currencies backend API', () => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityService)

    const exchangeAPIendpoint: Observable<Currency[]> = service.getAllSupportedCurrencies()
    expect(exchangeAPIendpoint).toBeTruthy()
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

  it('should be cache conversion result', done => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeService)
    const inputCurrency: CurrencyConvertorInput = {
      sourceAmount: 1000,
      sourceCurrency: 'CAD',
      targetCurrency: 'INR',
    }
    let firstConvertedCurrency: ConvertedCurrency
    service.convertCurrency(inputCurrency).subscribe((result: ConvertedCurrency) => {
      firstConvertedCurrency = result
    })
    jasmine.clock().tick(2000)

    expect(firstConvertedCurrency).toBeTruthy()
    let secondConvertedCurrency: ConvertedCurrency
    service.convertCurrency(inputCurrency).subscribe((result: ConvertedCurrency) => {
      secondConvertedCurrency = result
    })
    jasmine.clock().tick(2000)
    expect(secondConvertedCurrency).toBeTruthy()

    expect(secondConvertedCurrency.targetAmount.toFixed(10)).toBe(
      (inputCurrency.sourceAmount * exchangeReponse.conversionRate).toFixed(10)
    )
    expect(firstConvertedCurrency.exchangeRate).toEqual(secondConvertedCurrency.exchangeRate)
    expect(secondConvertedCurrency.targetCurrency).toBe(inputCurrency.targetCurrency)
    expect(secondConvertedCurrency.sourceCurrency).toBe(inputCurrency.sourceCurrency)
    expect(secondConvertedCurrency.sourceAmount).toBe(exchangeReponse.amount)
    done()
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })
})
