import { Component, OnInit, ViewChild } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { Currency, fixedSourceCurrency, fixedTargetCurrency } from 'src/app/common/base-rates'
import { ConvertedCurrency } from 'src/app/common/currency-conversion'
import { CurrencyUtilityService } from 'src/app/currency-service/currency-utility.service'
import { CurrencyConversionResultComponent } from '../currency-conversion-result/currency-conversion-result.component'

@Component({
  selector: 'app-convertor-card',
  templateUrl: './convertor-card.component.html',
  styleUrls: ['./convertor-card.component.scss'],
})
export class ConvertorCardComponent implements OnInit {
  filteredSourceCurrencies: Observable<Currency[]>
  filteredTargetCurrencies: Observable<Currency[]>

  constructor(private fb: FormBuilder, private utilityService: CurrencyUtilityService) {}

  @ViewChild(CurrencyConversionResultComponent)
  private resultComponent: CurrencyConversionResultComponent
  conversionResult: ConvertedCurrency
  backendError: any
  disableConvertButton: boolean
  supportedCurrencies: Currency[]

  public convertorForm: FormGroup = this.fb.group({
    sourceAmount: [1, [Validators.required, Validators.pattern(/^\d{1,9}(\.\d{1,10})?$/)]],
    // eslint-disable-next-line no-sparse-arrays
    sourceCurrency: [, [Validators.required, Validators.pattern(/^[a-zA-Z]{3}$/)]],
    // eslint-disable-next-line no-sparse-arrays
    targetCurrency: [, [Validators.required, Validators.pattern(/^[a-zA-Z]{3}$/)]],
    convertButtonText: ['Loading ....'],
  })

  ngOnInit() {
    this.disableConvertButtonWithText('Loading....')

    if (!this.supportedCurrencies) {
      this.utilityService.getAllSupportedCurrencies().subscribe(
        (response: Currency[]) => {
          this.supportedCurrencies = response

          const sourceCurrencyIndex = this.findIndexOfCurrency(
            fixedSourceCurrency.currencySymbol,
            this.supportedCurrencies
          )
          const targetCurrencyIndex = this.findIndexOfCurrency(
            fixedTargetCurrency.currencySymbol,
            this.supportedCurrencies
          )
          this.convertorForm.patchValue({
            sourceCurrency: this.supportedCurrencies[sourceCurrencyIndex].currencySymbol,
            targetCurrency: this.supportedCurrencies[targetCurrencyIndex].currencySymbol,
          })
          this.enableConvertButtonWithText(
            'Convert ' +
              this.supportedCurrencies[sourceCurrencyIndex].currencySymbol +
              ' to ' +
              this.supportedCurrencies[targetCurrencyIndex].currencySymbol
          )
          this.filteredSourceCurrencies = this.convertorForm.get('sourceCurrency').valueChanges.pipe(
            startWith(''),
            map(currency => (currency ? this._filter(currency) : this.supportedCurrencies.slice()))
          )
          this.filteredTargetCurrencies = this.convertorForm.get('targetCurrency').valueChanges.pipe(
            startWith(''),
            map(currency => (currency ? this._filter(currency) : this.supportedCurrencies.slice()))
          )
        },
        (error: any) => {
          this.backendError = error
          this.convertorForm.disable()
          this.convertorForm.reset()
        }
      )
    }
  }

  public findIndexOfCurrency(currency: string, currencyArray: Currency[]): number {
    if (currency && currencyArray && currencyArray.length > 0) {
      return currencyArray.map(value => value.currencySymbol).indexOf(currency)
    }
  }

  // Convert button handling
  public convertCurrency() {
    this.disableConvertButtonWithText('Converting....')
    if (!this.supportedCurrencies || this.backendError) {
      return
    }

    const inputCurrency = {
      sourceAmount: this.convertorForm.get('sourceAmount').value,
      sourceCurrency: this.convertorForm.get('sourceCurrency').value,
      targetCurrency: this.convertorForm.get('targetCurrency').value,
    }

    this.utilityService.convertCurrency(inputCurrency).subscribe(
      (result: ConvertedCurrency) => {
        this.conversionResult = result
        this.enableConvertButtonWithText(this.getCurrencyText(result.sourceCurrency, result.targetCurrency))
        this.updateResultComponent({ ...this.conversionResult })
      },
      (error: any) => {
        this.backendError = error
        this.convertorForm.disable()
        this.convertorForm.reset()
        this.conversionResult = undefined
        this.updateResultComponent(undefined)
      }
    )
  }

  public switchCurrencies() {
    if (!this.supportedCurrencies || this.backendError) {
      return
    }
    const currentSourceCurrency: string = this.convertorForm.get('sourceCurrency').value
    const currentTargetCurrency: string = this.convertorForm.get('targetCurrency').value

    if (this.conversionResult) {
      this.switchCurrenciesOnConversionResult()
    }
    this.switchCurrenciesOnForm(currentTargetCurrency, currentSourceCurrency)
    this.switchCurrenciesOnButton(currentTargetCurrency, currentSourceCurrency)
  }

  public switchCurrenciesOnForm(newSourceCurrency: string, newTargetCurrency: string) {
    const sourceCurrencyIndex = this.findIndexOfCurrency(newSourceCurrency, this.supportedCurrencies)
    const targetCurrencyIndex = this.findIndexOfCurrency(newTargetCurrency, this.supportedCurrencies)
    this.convertorForm.patchValue({
      sourceCurrency: this.supportedCurrencies[sourceCurrencyIndex].currencySymbol,
      targetCurrency: this.supportedCurrencies[targetCurrencyIndex].currencySymbol,
    })
  }

  public switchCurrencyAmounts() {
    let switchedSourceAmount: any
    if (typeof this.conversionResult.sourceAmount === 'string') {
      switchedSourceAmount = parseFloat(this.conversionResult.sourceAmount)
    } else {
      switchedSourceAmount = this.conversionResult.sourceAmount
    }
    switchedSourceAmount = switchedSourceAmount.toFixed(10).replace(/(\.\d*?[0-9])0+$/, '')
    this.convertorForm.patchValue({
      sourceAmount: switchedSourceAmount,
    })
    this.updateResultComponent(this.conversionResult)
  }

  public switchCurrenciesOnConversionResult() {
    const newConversionResult: ConvertedCurrency = {
      exchangeRate: 1 / this.conversionResult.exchangeRate,
      sourceCurrency: this.conversionResult.targetCurrency,
      sourceAmount: this.conversionResult.targetAmount,
      targetCurrency: this.conversionResult.sourceCurrency,
      targetAmount: this.conversionResult.sourceAmount,
      exchangeResultDate: this.conversionResult.exchangeResultDate,
    }
    this.conversionResult = { ...newConversionResult }
    const currentSourceAmount: number = this.convertorForm.get('sourceAmount').value
    if (!isNaN(currentSourceAmount)) {
      this.switchCurrencyAmounts()
    }
  }
  public switchCurrenciesOnButton(newSourceCurrency: string, newTargetCurrency: string) {
    this.enableConvertButtonWithText(this.getCurrencyText(newSourceCurrency, newTargetCurrency))
  }

  public updateCurrency() {
    if (!this.supportedCurrencies || this.backendError) {
      return
    }
    const sourceCurrency: string = this.convertorForm.get('sourceCurrency').value
    const targetCurrency: string = this.convertorForm.get('targetCurrency').value
    this.conversionResult = undefined
    this.enableConvertButtonWithText(this.getCurrencyText(sourceCurrency, targetCurrency))
    this.resultComponent.convertedCurrency = undefined
  }

  public enableConvertButtonWithText(text: string) {
    this.enableOrDisableConvertButtonWithText(text, true)
  }
  public disableConvertButtonWithText(text: string) {
    this.enableOrDisableConvertButtonWithText(text, false)
  }

  private enableOrDisableConvertButtonWithText(text: string, enable: boolean) {
    const convertButtonControl: AbstractControl = this.convertorForm.get('convertButtonText')
    convertButtonControl.setValue(text)
    this.disableConvertButton = !enable
  }

  public getCurrencyText(sourceCurrency: string, targetCurrency: string) {
    return 'Convert ' + sourceCurrency + ' to ' + targetCurrency
  }
  public getConvertButtonText(): string {
    const convertButtonControl: AbstractControl = this.convertorForm.get('convertButtonText')
    return convertButtonControl.value
  }
  public updateSourceAmount(amount: number) {
    if (!this.supportedCurrencies || this.backendError) {
      return
    }

    if (this.conversionResult) {
      this.conversionResult.sourceAmount = amount
      this.conversionResult.targetAmount = this.conversionResult.exchangeRate * amount
      if (!isNaN(this.conversionResult.sourceAmount)) {
        this.updateResultComponent(this.conversionResult)
      } else {
        this.updateResultComponent(null)
      }
    }
  }
  updateResultComponent(convertedCurrency: ConvertedCurrency) {
    this.resultComponent.updateConversionResult(convertedCurrency)
  }
  private _filter(currencySymbol: string): Currency[] {
    const selectedCurrency = currencySymbol.toLowerCase()

    return this.supportedCurrencies.filter(
      currency => currency.currencySymbol.toLowerCase().indexOf(selectedCurrency) === 0
    )
  }
}
