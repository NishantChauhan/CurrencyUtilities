import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { mockMatIconModule } from 'src/app/common/mock-mat-icons'
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
    })
      .overrideModule(MatIconModule, mockMatIconModule)
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertorCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should have coverage for exceptional conditions for resting result component', () => {
    component.resultComponent = undefined
    component.resetResultComponent()
    component.updateResultComponent(undefined)
  })
  it('should have coverage for exceptional conditions for converting to float', () => {
    component.convertToFloat({ value: 'Number' })
    component.convertToFloat({ value: '1000' })
    component.convertToFloat({ value: ' ' })
  })
  it('should have coverage for exceptional conditions for switch currency', () => {
    component.convertorForm.setValue({
      sourceAmount: 1000,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
    })
    component.switchCurrencies()
    component.convertCurrency()
  })
  it('should have coverage for exceptional conditions for source Amount', () => {
    component.convertorForm.setValue({
      sourceAmount: 1000,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
    })
    // Backend error Coverage
    component.updateSourceAmount('1000')

    //Not NaN string coverage
    component.backendError = undefined
    component.supportedCurrencies = mockSupportedCurrencies
    component.updateSourceAmount('1000')

    // NaN coverage
    component.conversionResult = {
      sourceAmount: 1,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetAmount: exchangeResponse.result,
      targetCurrency: fixedTargetCurrency.currencySymbol,
      exchangeRate: exchangeResponse.conversionRate,
      exchangeResultDate: exchangeResponse.rateAsOf,
    }

    component.updateSourceAmount('Number')
  })

  it('should have coverage for exceptional conditions for convert currency', () => {
    component.conversionResult = {
      sourceAmount: 1,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetAmount: exchangeResponse.result,
      targetCurrency: fixedTargetCurrency.currencySymbol,
      exchangeRate: exchangeResponse.conversionRate,
      exchangeResultDate: exchangeResponse.rateAsOf,
    }
    component.backendError = undefined
    component.supportedCurrencies = mockSupportedCurrencies
    component.convertorForm.get('sourceAmount').setValue('1')
    component.convertCurrency()
  })
})
