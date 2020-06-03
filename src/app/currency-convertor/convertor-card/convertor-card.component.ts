import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { Currency } from 'src/app/common/base-rates'
import { ConvertedCurrency } from 'src/app/common/currency-conversion'
import { CurrencyUtilityService } from 'src/app/currency-service/currency-utility.service'
import { CurrencyConversionResultComponent } from '../currency-conversion-result/currency-conversion-result.component'
import { CurrencySupportValidator } from '../currency-support-validator/currency-support-validator.directive'
import { fixedSourceCurrency, fixedTargetCurrency } from './../../common/base-rates'

@Component({
  selector: 'app-convertor-card',
  templateUrl: './convertor-card.component.html',
  styleUrls: ['./convertor-card.component.scss'],
})
export class ConvertorCardComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private utilityService: CurrencyUtilityService,
    private supportValidator: CurrencySupportValidator
  ) {}
  filteredSourceCurrencies: Observable<Currency[]>
  filteredTargetCurrencies: Observable<Currency[]>

  @ViewChild(CurrencyConversionResultComponent)
  resultComponent: CurrencyConversionResultComponent
  conversionResult: ConvertedCurrency
  backendError: any
  isConvertButtonDisabled: boolean

  supportedCurrencies: Currency[]

  get sourceAmount() {
    return this.convertorForm.get('sourceAmount')
  }
  get sourceCurrency() {
    return this.convertorForm.get('sourceCurrency')
  }
  get targetCurrency() {
    return this.convertorForm.get('targetCurrency')
  }

  public convertorForm: FormGroup = this.fb.group({
    sourceAmount: [1, [Validators.required, Validators.pattern(/^\d{1,9}(\.\d{1,10})?$/)]],
    sourceCurrency: [
      fixedSourceCurrency.currencySymbol,
      {
        validators: [Validators.required, Validators.pattern(/^[a-zA-Z]{1,3}$/)],
        asyncValidators: [this.supportValidator.validate.bind(this.supportValidator)],
      },
    ],
    targetCurrency: [
      fixedTargetCurrency.currencySymbol,
      {
        validators: [Validators.required, Validators.pattern(/^[a-zA-Z]{1,3}$/)],
        asyncValidators: [this.supportValidator.validate.bind(this.supportValidator)],
      },
    ],
  })
  public ngOnInit() {
    this.disableConvertButton()
    this.utilityService.getAllSupportedCurrencies().subscribe(
      (response: Currency[]) => {
        this.supportedCurrencies = response

        this.attachFiltersToCurrencyAutocomplete()
        this.enableConvertButton()
      },
      (error: any) => {
        this.backendError = error
        this.convertorForm.disable()
        this.convertorForm.reset()
      }
    )
  }
  resetForm() {
    this.convertorForm.reset()
    this.resetResultComponent()
    this.conversionResult = undefined
  }

  private attachFiltersToCurrencyAutocomplete() {
    this.filteredSourceCurrencies = this.sourceCurrency.valueChanges.pipe(
      startWith(''),
      map(currency =>
        currency ? this._supportedCurrencyFilter(currency, this.supportedCurrencies) : this.supportedCurrencies.slice()
      )
    )
    this.filteredTargetCurrencies = this.targetCurrency.valueChanges.pipe(
      startWith(''),
      map(currency =>
        currency ? this._supportedCurrencyFilter(currency, this.supportedCurrencies) : this.supportedCurrencies.slice()
      )
    )
  }
  private _supportedCurrencyFilter(currencySymbol: string, supportedCurrencyList: Currency[]): Currency[] {
    const selectedCurrency = currencySymbol.toLowerCase()

    return supportedCurrencyList.filter(
      currency => currency.currencySymbol.toLowerCase().indexOf(selectedCurrency) === 0
    )
  }
  public convertCurrency() {
    this.disableConvertButton()
    if (!this.supportedCurrencies || this.backendError) {
      return
    }
    const amount: number = this.updateNumericSourceAmount()
    const inputCurrency = {
      sourceAmount: amount,
      sourceCurrency: this.sourceCurrency.value,
      targetCurrency: this.targetCurrency.value,
    }

    this.utilityService.convertCurrency(inputCurrency).subscribe(
      (result: ConvertedCurrency) => {
        this.conversionResult = result
        this.enableConvertButton()
        this.updateResultComponent(this.conversionResult)
      },
      (error: any) => {
        this.backendError = error
        this.convertorForm.disable()
        this.convertorForm.reset()
        this.disableResultComponent()
      }
    )
  }

  private updateNumericSourceAmount() {
    const inputAmount: number = this.sourceAmount.value
    let amount: number
    if (typeof inputAmount === 'string' && !isNaN(inputAmount)) {
      amount = parseFloat(inputAmount)
      this.sourceAmount.setValue(amount)
    } else {
      amount = inputAmount
    }
    return amount
  }

  public switchCurrencies() {
    if (!this.supportedCurrencies || this.backendError) {
      return
    }
    const currentSourceCurrency: string = this.sourceCurrency.value
    const currentTargetCurrency: string = this.targetCurrency.value

    if (this.conversionResult) {
      this.switchCurrenciesOnConversionResult()
    }
    this.switchCurrenciesOnForm(currentTargetCurrency, currentSourceCurrency)
  }

  public switchCurrenciesOnForm(newSourceCurrency: string, newTargetCurrency: string) {
    this.convertorForm.patchValue({
      sourceCurrency: newSourceCurrency,
      targetCurrency: newTargetCurrency,
    })
  }

  public switchCurrencyAmounts() {
    const resultAmount: number = this.conversionResult.sourceAmount
    const amount: number = parseFloat(resultAmount.toFixed(10))
    this.sourceAmount.setValue(amount)
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
    this.switchCurrencyAmounts()
  }

  public updateSourceAmount(inputAmount: string) {
    if (!this.supportedCurrencies || this.backendError) {
      return
    }
    const amount: number = parseFloat(inputAmount)
    if (this.conversionResult) {
      this.conversionResult.sourceAmount = amount
      this.conversionResult.targetAmount = this.conversionResult.exchangeRate * amount
      if (!isNaN(this.conversionResult.sourceAmount)) {
        this.updateResultComponent(this.conversionResult)
      } else {
        this.disableResultComponent()
      }
    }
  }
  convertToFloat(element: any) {
    if (!isNaN(element.value) && element.value.trim().length > 0) {
      element.value = parseFloat(element.value)
    }
  }
  updateResultComponent(convertedCurrency: ConvertedCurrency) {
    if (this.resultComponent) {
      this.resultComponent.updateConversionResult({ ...convertedCurrency })
    }
  }
  disableResultComponent() {
    if (this.resultComponent) {
      this.resultComponent.disableResultComponent()
    }
  }
  resetAmounts() {
    this.sourceAmount.setValue(1)
    this.conversionResult = undefined
    this.resetResultComponent()
  }

  resetResultComponent() {
    if (this.resultComponent) {
      this.resultComponent.resetConversionResult()
    }
  }

  public enableConvertButton() {
    this.isConvertButtonDisabled = false
  }
  public disableConvertButton() {
    this.isConvertButtonDisabled = true
  }

  shouldDisableConvertButton() {
    if (this.isConvertButtonDisabled || this.convertorForm.invalid) {
      this.disableResultComponent()
      return true
    }
    return false
  }
  shouldDisableSwitcherButton() {
    if (this.convertorForm.invalid) {
      return true
    }
    return false
  }
}
