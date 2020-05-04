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

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConversionResultComponent)
    component = fixture.componentInstance
    const convertedCurrency: ConvertedCurrency = {
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
      sourceAmount: 1,
      targetAmount: 51.76,
      exchangeRate: 51.76,
      exchangeResultDate: new Date('2020-04-01 01:02:03'),
    }
    component.updateConversionResult(convertedCurrency)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show converted amount in result view', () => {
    const resultAmount = fixture.nativeElement.querySelector('.convertor-alert-success')
    expect(resultAmount.textContent).toBe('51.76 INR')
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
      '1 CAD equals' + '51.76 INR as of Apr 1, 2020, 1:02:03 AM  Rate 1 CAD = 51.76 INR '
    )
  })
  afterEach(() => {})
})
