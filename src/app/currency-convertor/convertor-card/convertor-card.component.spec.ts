import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { fixedSourceCurrency, fixedTargetCurrency } from 'src/app/common/base-rates'
import { exchangeReponse } from 'src/app/mock-response/mock-reponse'
import { CurrencyConversionResultComponent } from '../currency-conversion-result/currency-conversion-result.component'
import { commonTestingModules, commonTestingProviders } from './../../common/common-testing'
import { ConvertorCardComponent } from './convertor-card.component'

describe('ConvertorCardComponent', () => {
  let component: ConvertorCardComponent
  let fixture: ComponentFixture<ConvertorCardComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      declarations: [ConvertorCardComponent, CurrencyConversionResultComponent],
      providers: commonTestingProviders,
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertorCardComponent)
    component = fixture.componentInstance
    jasmine.clock().install()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should convert ' + fixedSourceCurrency.currencySymbol + ' to ' + fixedTargetCurrency.currencySymbol, () => {
    for (let i = 0; i < 5; i++) {
      component.convertCurrency()
    }
    jasmine.clock().tick(3000)
    expect(component.conversionResult.targetAmount).toBe(exchangeReponse.result)
  })

  it('should update result on source amount change ', done => {
    const convertButton = fixture.nativeElement.querySelector('#convertCurrency > span')
    convertButton.click()
    jasmine.clock().tick(3000)
    fixture.detectChanges()
    const targetAmount = fixture.nativeElement.querySelector(
      'app-currency-conversion-result > div > div > div > b > span'
    )
    expect(targetAmount.textContent.trim().replace(/,/g, '')).toBe(
      exchangeReponse.result.toFixed(10) + ' ' + exchangeReponse.to
    )
    const sourceAmountControl = component.convertorForm.get('sourceAmount')
    const sourceAmount = sourceAmountControl.value
    component.updateSourceAmount('1000')
    component.convertToFloat(sourceAmount)
    fixture.whenStable().then(() => {
      expect(targetAmount.textContent.trim().replace(/,/g, '')).toBe(
        exchangeReponse.result.toFixed(10) + ' ' + exchangeReponse.to
      )
      done()
    })
  })

  it('should update convert button on target currency change', () => {
    component.onTargetCurrencySelect('USD')
    fixture.detectChanges()
    const buttonText = component.convertorForm.get('convertButtonText').value
    expect(buttonText).toBe('Convert ' + fixedSourceCurrency.currencySymbol + ' to USD')
  })

  it('should update convert button on source currency change', () => {
    component.onSourceCurrencySelect('USD')
    fixture.detectChanges()
    const buttonText = component.convertorForm.get('convertButtonText').value
    expect(buttonText).toBe('Convert USD to ' + fixedTargetCurrency.currencySymbol)
  })
  it('should switch source currency and target currency on click of switcher', async () => {
    const switcher = fixture.nativeElement.querySelector('mat-card-actions > button > span')

    switcher.click()
    await fixture.whenStable()
    fixture.detectChanges()
    const sourceCurrencyControl = fixture.nativeElement.querySelector('#cc-source-currency')
    const targetCurrencyControl = fixture.nativeElement.querySelector('#cc-target-currency')
    expect(sourceCurrencyControl.value.trim()).toBe(fixedTargetCurrency.currencySymbol)
    expect(targetCurrencyControl.value.trim()).toBe(fixedSourceCurrency.currencySymbol)
  })
  it('should switch currencies on convert button on click of switcher', () => {
    const switcher = fixture.nativeElement.querySelector('mat-card-actions > button > span')
    switcher.click()
    fixture.detectChanges()
    const convertButton = fixture.nativeElement.querySelector('#convertCurrency > span')
    expect(convertButton.textContent.trim()).toBe(
      'Convert ' + fixedTargetCurrency.currencySymbol + ' to ' + fixedSourceCurrency.currencySymbol
    )
  })
  it('should switch amount with target amount, when switcher is clicked after convert button click', async () => {
    component.convertorForm.get('sourceAmount').setValue(1000)

    const convertButton = fixture.nativeElement.querySelector('#convertCurrency > span')
    convertButton.click()
    jasmine.clock().tick(3000)

    const switcher = fixture.nativeElement.querySelector('mat-card-actions > button > span')
    switcher.click()
    await fixture.whenStable()
    fixture.detectChanges()

    const sourceCurrencyControl = fixture.nativeElement.querySelector('#cc-source-currency')
    expect(sourceCurrencyControl.value.trim()).toBe(fixedTargetCurrency.currencySymbol)

    const targetCurrencyControl = fixture.nativeElement.querySelector('#cc-target-currency')
    expect(targetCurrencyControl.value.trim()).toBe(fixedSourceCurrency.currencySymbol)

    expect(convertButton.textContent.trim()).toBe(
      'Convert ' + fixedTargetCurrency.currencySymbol + ' to ' + fixedSourceCurrency.currencySymbol
    )
    const sourceAmountControl = fixture.nativeElement.querySelector('#cc-source-amount')
    expect(sourceAmountControl.value.trim()).toBe(exchangeReponse.result.toFixed(10))

    const targetAmount = fixture.nativeElement.querySelector(
      'app-currency-conversion-result > div > div > div > b > span'
    )
    expect(targetAmount.textContent.trim().replace(/,/g, '')).toBe(exchangeReponse.amount + ' ' + exchangeReponse.from)
  })

  it('should have same source and target amount and currencies on, switcher is clicked twice after convert button click', async () => {
    component.convertorForm.setValue({
      sourceAmount: 1000,
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
      convertButtonText: 'Convert ' + fixedSourceCurrency.currencySymbol + ' to ' + fixedTargetCurrency.currencySymbol,
    })

    const convertButton = fixture.nativeElement.querySelector('#convertCurrency > span')
    convertButton.click()
    jasmine.clock().tick(3000)

    const switcher = fixture.nativeElement.querySelector('mat-card-actions > button > span')
    switcher.click()
    switcher.click()
    await fixture.whenStable()
    fixture.detectChanges()

    const sourceCurrencyControl = fixture.nativeElement.querySelector('#cc-source-currency')
    expect(sourceCurrencyControl.value.trim()).toBe(fixedSourceCurrency.currencySymbol)

    const targetCurrencyControl = fixture.nativeElement.querySelector('#cc-target-currency')
    expect(targetCurrencyControl.value.trim()).toBe(fixedTargetCurrency.currencySymbol)

    expect(convertButton.textContent.trim()).toBe(
      'Convert ' + fixedSourceCurrency.currencySymbol + ' to ' + fixedTargetCurrency.currencySymbol
    )
    const sourceAmountControl = fixture.nativeElement.querySelector('#cc-source-amount')
    expect(sourceAmountControl.value.trim()).toBe(parseFloat(exchangeReponse.amount.toFixed(10)).toString())

    const targetAmount = fixture.nativeElement.querySelector(
      'app-currency-conversion-result > div > div > div > b > span'
    )

    expect(targetAmount.textContent.trim().replace(/,/g, '')).toBe(
      exchangeReponse.result.toFixed(10) + ' ' + exchangeReponse.to
    )
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })
})
