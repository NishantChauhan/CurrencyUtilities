import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { fixedSourceCurrency, fixedTargetCurrency } from 'src/app/common/base-rates'
import { ConvertedCurrency } from 'src/app/common/currency-conversion'
import { commonTestingModules, commonTestingProviders } from './../../common/common-testing'
import { CurrencyConversionResultComponent } from './currency-conversion-result.component'

describe('CurrencyConversionResultComponent', () => {
  let fixture: ComponentFixture<CurrencyConversionResultComponent>
  let component: CurrencyConversionResultComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      declarations: [CurrencyConversionResultComponent],
      providers: commonTestingProviders,
    }).compileComponents()
  }))

  const convertedCurrency: ConvertedCurrency = {
    sourceCurrency: fixedSourceCurrency.currencySymbol,
    targetCurrency: fixedTargetCurrency.currencySymbol,
    sourceAmount: 1,
    targetAmount: 51.76,
    exchangeRate: 51.76,
    exchangeResultDate: new Date('2020-04-01 01:02:03'),
  }
  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConversionResultComponent)
    component = fixture.componentInstance
    component.updateConversionResult(convertedCurrency)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show converted amount in result view', () => {
    const resultAmount = fixture.nativeElement.querySelector('.convertor-alert-success')
    expect(resultAmount.textContent).toBe(convertedCurrency.exchangeRate + ' ' + fixedTargetCurrency.currencySymbol)
  })
  it('should show not show result view for null convertedCurrency', () => {
    component.convertedCurrency = null
    fixture.detectChanges()
    const resultAmount = fixture.nativeElement.querySelector('.convertor-alert-success')
    expect(resultAmount).toBeFalsy()
  })

  it('should show the conversion message in the result view', () => {
    const resultAlert = fixture.nativeElement.querySelector('.result-container')
    expect(resultAlert.textContent).toBe(
      '1 ' +
        fixedSourceCurrency.currencySymbol +
        ' equals' +
        convertedCurrency.exchangeRate +
        ' ' +
        fixedTargetCurrency.currencySymbol +
        ' Last updated: 1-Apr-2020  Rate 1 ' +
        fixedSourceCurrency.currencySymbol +
        ' = ' +
        convertedCurrency.exchangeRate +
        ' ' +
        fixedTargetCurrency.currencySymbol +
        ' '
    )
  })
  afterEach(() => {})
})
