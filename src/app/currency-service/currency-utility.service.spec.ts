import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { Observable } from 'rxjs'
import { ConversionRateAPIResponse, Currency } from '../common/base-rates'
import { ConvertedCurrency, CurrencyConvertorInput } from '../common/currency-conversion'
import { exchangeReponse } from '../mock-response/mock-reponse'
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
  it('should be convert 1 CAD to ' + exchangeReponse.conversionRate + ' INR', () => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeService)
    const inputCurrency: CurrencyConvertorInput = {
      sourceAmount: 1,
      sourceCurrency: 'CAD',
      targetCurrency: 'INR',
    }
    let convertedCurrency
    service.convertCurrency(inputCurrency).subscribe((result: ConvertedCurrency) => {
      convertedCurrency = result
    })
    jasmine.clock().tick(3000)
    expect(convertedCurrency).toBeTruthy()
    expect(convertedCurrency.targetAmount).toBe(inputCurrency.sourceAmount * exchangeReponse.conversionRate)
    expect(convertedCurrency.targetCurrency).toBe(inputCurrency.targetCurrency)
    expect(convertedCurrency.sourceCurrency).toBe(inputCurrency.sourceCurrency)
    expect(convertedCurrency.sourceAmount).toBe(exchangeReponse.amount)
  })

  it('should be return supported currencies', () => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityFakeService)
    let supportedCurrencies: Currency[]
    service.getAllSupportedCurrencies().subscribe(response => {
      supportedCurrencies = response
    })
    jasmine.clock().tick(3000)
    expect(supportedCurrencies).toBeTruthy()
    expect(supportedCurrencies).toContain({
      currencyName: 'CAD',
      currencySymbol: 'CAD',
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

  it('should be return actual endpoint subscription for supported currencies backend API', () => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityService)

    const exchangeAPIendpoint: Observable<Currency[]> = service.getAllSupportedCurrencies()
    expect(exchangeAPIendpoint).toBeTruthy()
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })
})
