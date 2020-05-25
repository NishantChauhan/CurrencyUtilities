import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { fixedTargetCurrency } from 'src/app/common/base-rates'
import { ConvertedCurrency } from 'src/app/common/currency-conversion'
import { fixedSourceCurrency } from './../../common/base-rates'
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
    const resultText: string = resultAlert.textContent
    const targetAmountPattern = new RegExp('\\d+(\\.\\d+)?.' + fixedTargetCurrency.currencySymbol, 'g')
    const source = resultText.match(/1.[A-Z]{3}/g)[1].split(' ')[1]
    const amount = resultText.match(targetAmountPattern)[0].split(' ')[0]
    const rate = resultText.match(targetAmountPattern)[1].split(' ')[0]

    expect(source).toBe(fixedSourceCurrency.currencySymbol)
    expect(amount).toBe(rate)
  })
  afterEach(() => {})
})
