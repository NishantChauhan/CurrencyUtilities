import { Component } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { fixedSourceCurrency, fixedTargetCurrency } from 'src/app/common/base-rates'
import { ConvertedCurrency } from './../../common/currency-conversion'
import { CurrencyConversionResultComponent } from './currency-conversion-result.component'

describe('CurrencyConversionResultComponent', () => {
  @Component({
    template: `
      <app-currency-conversion-result [convertedCurrency]="conversionResult"></app-currency-conversion-result>
    `,
  })
  class TestConvertorCardComponent {
    conversionResult: ConvertedCurrency = {
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
      sourceAmount: 1,
      targetAmount: 51.76,
      exchangeRate: 51.76,
      exchangeResultDate: new Date('2020-04-01 01:02:03'),
    }
  }
  let testComponent: TestConvertorCardComponent
  let fixture: ComponentFixture<TestConvertorCardComponent>
  let resultAlert

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyConversionResultComponent, TestConvertorCardComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConvertorCardComponent)
    testComponent = fixture.componentInstance
    resultAlert = fixture.nativeElement.querySelector('.alert-success')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(testComponent).toBeTruthy()
  })

  it('should show the updated amount in the result component', () => {
    expect(resultAlert.textContent).toBe(
      ' As of Apr 1, 2020, 1:02:03 AM' + '1 CAD equals 51.76 INR' + 'Rate 1 CAD = 51.76 INR'
    )
  })
})
