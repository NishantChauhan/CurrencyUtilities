import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { Currency } from 'src/app/common/base-rates'
import { ConvertedCurrency } from 'src/app/common/currency-conversion'
import { CurrencyUtilityService } from 'src/app/currency-service/currency-utility.service'
import { CurrencyConversionResultComponent } from '../currency-conversion-result/currency-conversion-result.component'
import { fixedSourceCurrency, fixedTargetCurrency } from './../../common/base-rates'

@Component({
  selector: 'app-convertor-card',
  templateUrl: './convertor-card.component.html',
  styleUrls: ['./convertor-card.component.scss'],
})
export class ConvertorCardComponent implements OnInit {
  constructor(private fb: FormBuilder, private utilityService: CurrencyUtilityService) {}
  filteredSourceCurrencies: Observable<Currency[]>
  filteredTargetCurrencies: Observable<Currency[]>

  @ViewChild(CurrencyConversionResultComponent)
  private resultComponent: CurrencyConversionResultComponent
  conversionResult: ConvertedCurrency
  backendError: any
  isConvertButtonDisabled: boolean
  supportedCurrencies: Currency[]

  public convertorForm: FormGroup = this.fb.group({
    sourceAmount: [1, [Validators.required, Validators.pattern(/^\d{1,9}(\.\d{1,10})?$/)]],
    sourceCurrency: [fixedSourceCurrency.currencySymbol, [Validators.required, Validators.pattern(/^[a-zA-Z]{3}$/)]],
    targetCurrency: [fixedTargetCurrency.currencySymbol, [Validators.required, Validators.pattern(/^[a-zA-Z]{3}$/)]],
  })
  public boolean
  ngOnInit() {
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
    this.disableResultComponent()
    this.conversionResult = undefined
    this.updateResultComponent(undefined)
  }

  private attachFiltersToCurrencyAutocomplete() {
    this.filteredSourceCurrencies = this.convertorForm.get('sourceCurrency').valueChanges.pipe(
      startWith(''),
      map(currency => (currency ? this._filter(currency) : this.supportedCurrencies.slice()))
    )
    this.filteredTargetCurrencies = this.convertorForm.get('targetCurrency').valueChanges.pipe(
      startWith(''),
      map(currency => (currency ? this._filter(currency) : this.supportedCurrencies.slice()))
    )
  }

  public convertCurrency() {
    this.disableConvertButton()
    if (!this.supportedCurrencies || this.backendError) {
      return
    }
    const amount: number = this.getNumericAmountsUpdateSourceControlWithIt()
    const inputCurrency = {
      sourceAmount: amount,
      sourceCurrency: this.convertorForm.get('sourceCurrency').value,
      targetCurrency: this.convertorForm.get('targetCurrency').value,
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

  private getNumericAmountsUpdateSourceControlWithIt() {
    const inputAmount: number = this.convertorForm.get('sourceAmount').value
    let amount: number
    if (typeof inputAmount === 'string' && !isNaN(inputAmount)) {
      amount = parseFloat(inputAmount)
      this.convertorForm.get('sourceAmount').setValue(amount)
    } else {
      amount = inputAmount
    }
    return amount
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
    this.convertorForm.get('sourceAmount').setValue(amount)
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

  public enableConvertButton() {
    this.isConvertButtonDisabled = false
  }
  public disableConvertButton() {
    this.isConvertButtonDisabled = true
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
    this.resultComponent.updateConversionResult({ ...convertedCurrency })
  }
  disableResultComponent() {
    this.resultComponent.disableResultComponent()
  }
  private _filter(currencySymbol: string): Currency[] {
    const selectedCurrency = currencySymbol.toLowerCase()

    return this.supportedCurrencies.filter(
      currency => currency.currencySymbol.toLowerCase().indexOf(selectedCurrency) === 0
    )
  }
  shouldDisableConvertButton() {
    const sourceCurrency: string = this.convertorForm.get('sourceCurrency').value
    const targetCurrency: string = this.convertorForm.get('targetCurrency').value

    if (
      this.isConvertButtonDisabled ||
      !this.convertorForm.valid ||
      sourceCurrency.length < 3 ||
      targetCurrency.length < 3 ||
      this._filter(sourceCurrency).length === 0 ||
      this._filter(targetCurrency).length === 0
    ) {
      if (this.resultComponent) {
        this.disableResultComponent()
      }
      return true
    }
    return false
  }
}
