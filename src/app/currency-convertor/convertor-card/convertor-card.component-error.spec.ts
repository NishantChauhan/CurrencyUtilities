import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { CurrencyConversionResultComponent } from '../currency-conversion-result/currency-conversion-result.component'
import { fixedSourceCurrency, fixedTargetCurrency } from './../../common/base-rates'
import { commonErrorTestingProviders, commonTestingModules } from './../../common/common-testing'
import { exchangeResponse, mockSupportedCurrencies } from './../../mock-response/mock-response'
import { CurrencyCardErrorComponent } from './../currency-card-error/currency-card-error.component'
import { ConvertorCardComponent } from './convertor-card.component'

describe('ConvertorCardComponent Errors', () => {
  let component: ConvertorCardComponent
  let fixture: ComponentFixture<ConvertorCardComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      declarations: [ConvertorCardComponent, CurrencyConversionResultComponent, CurrencyCardErrorComponent],
      providers: commonErrorTestingProviders,
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertorCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should fail for result component not loaded', () => {
    component.resultComponent = undefined
    component.resetResultComponent()
    component.updateResultComponent(undefined)
  })
  it('should throw error while currency conversion', () => {
    component.convertorForm.setValue({
      sourceAmount: 1000,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
    })
    component.switchCurrencies()
    component.convertCurrency()
    component.updateSourceAmount('1000')
    component.convertToFloat({ value: 'Number' })
    component.convertToFloat({ value: '1000' })
    component.convertToFloat({ value: ' ' })

    component.backendError = undefined

    component.supportedCurrencies = mockSupportedCurrencies

    component.backendError = undefined
    component.supportedCurrencies = mockSupportedCurrencies
    component.switchCurrencies()

    component.backendError = undefined
    component.supportedCurrencies = mockSupportedCurrencies
    component.updateSourceAmount('1000')

    component.backendError = undefined
    component.supportedCurrencies = mockSupportedCurrencies
    component.conversionResult = {
      sourceAmount: 1,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetAmount: exchangeResponse.result,
      targetCurrency: fixedTargetCurrency.currencySymbol,
      exchangeRate: exchangeResponse.conversionRate,
      exchangeResultDate: exchangeResponse.rateAsOf,
    }
    component.updateSourceAmount('Number')
    component.convertToFloat('Number')

    component.backendError = undefined
    component.supportedCurrencies = mockSupportedCurrencies
    component.convertorForm.get('sourceAmount').setValue('1')
    component.convertCurrency()

    component.convertorForm.get('sourceAmount').setValue(1)
    component.convertCurrency()

    expect(component.backendError).toBeTruthy()
  })
})
