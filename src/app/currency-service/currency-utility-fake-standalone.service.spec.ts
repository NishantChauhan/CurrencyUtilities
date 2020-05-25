import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { fixedTargetCurrency } from 'src/app/common/base-rates'
import { environment } from 'src/environments/environment'
import { Currency, fixedSourceCurrency } from '../common/base-rates'
import { CurrencyConvertorInput } from '../common/currency-conversion'
import { exchangeResponse, mockStandaloneResponse } from '../mock-response/mock-response'
import { ConvertedCurrency } from './../common/currency-conversion'
import { CurrencyUtilityFakeStandaloneService } from './currency-utility-fake-standalone.service'
import { CurrencyUtilityService, CurrencyUtilityServiceInterface } from './currency-utility.service'

describe('CurrencyUtilityService Standalone', () => {
  beforeEach(() => {
    environment.standalone = true
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  })

  it('should be created', () => {
    const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeStandaloneService)
    expect(service).toBeTruthy()
  })
  it('should be return supported currencies', done => {
    const service: CurrencyUtilityService = TestBed.inject(CurrencyUtilityFakeStandaloneService)
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

  it(
    'should be convert 1000 ' +
      fixedTargetCurrency.currencySymbol +
      ' to ' +
      exchangeResponse.result +
      ' ' +
      fixedTargetCurrency.currencySymbol,
    done => {
      const service: CurrencyUtilityServiceInterface = TestBed.inject(CurrencyUtilityFakeStandaloneService)
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
      const conversionRate =
        mockStandaloneResponse.rates[fixedTargetCurrency.currencySymbol] /
        mockStandaloneResponse.rates[fixedSourceCurrency.currencySymbol]
      expect(convertedCurrency.targetAmount.toFixed(10)).toBe((inputCurrency.sourceAmount * conversionRate).toFixed(10))
      expect(convertedCurrency.targetCurrency).toBe(inputCurrency.targetCurrency)
      expect(convertedCurrency.sourceCurrency).toBe(inputCurrency.sourceCurrency)
      done()
    }
  )

  afterEach(() => {
    environment.standalone = false
  })
})
