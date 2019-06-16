import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConvertedCurrency } from 'src/app/common/currency-conversion';
import { CurrencyUtilityService } from './../../currency-service/currency-utility.service';

@Component({
  selector: 'app-convertor-card',
  templateUrl: './convertor-card.component.html',
  styleUrls: ['./convertor-card.component.css'],
})
export class ConvertorCardComponent implements OnInit {
  conversionResult: ConvertedCurrency;
  disableConvertButton: boolean;

  constructor(private fb: FormBuilder, private utilityService: CurrencyUtilityService) {}

  public convertorForm: FormGroup = this.fb.group({
    sourceAmount: [1, [Validators.required, Validators.pattern(/^\d{0,9}(\.\d{1,2})?$/)]],
    sourceCurrency: ['CAD', Validators.required],
    targetAmount: [, [Validators.pattern(/^\d{0,9}(\.\d{1,2})?$/)]],
    targetCurrency: ['INR', Validators.required],
    convertButtonText: ['Convert CAD to INR'],
  });
  ngOnInit() {}

  // Convert button handling
  public convertCurrency() {
    this.disableConvertButtonWithText('Converting....');
    this.disableTargetAmount();
    const inputCurrency = {
      sourceAmount: this.convertorForm.get('sourceAmount').value,
      sourceCurrency: this.convertorForm.get('sourceCurrency').value,
      targetCurrency: this.convertorForm.get('targetCurrency').value,
    };

    this.utilityService.convertCurrency(inputCurrency).subscribe((result: ConvertedCurrency) => {
      this.convertorForm.patchValue({
        targetAmount: result.targetAmount.toFixed(2),
      });
      this.enableTargetAmount();
      this.conversionResult = result;
      this.enableConvertButtonWithText(this.getCurrencyText(result.sourceCurrency, result.targetCurrency));
    });
  }

  public updateCurrency() {
    const sourceCurrency: string = this.convertorForm.get('sourceCurrency').value;
    const targetCurrency: string = this.convertorForm.get('targetCurrency').value;
    this.conversionResult = undefined;
    this.enableConvertButtonWithText(this.getCurrencyText(sourceCurrency, targetCurrency));
  }

  // Target Amount Textbox handling
  public enableTargetAmount() {
    this.enableOrDisableTargetAmount(true);
  }
  public disableTargetAmount() {
    this.enableOrDisableTargetAmount(false);
  }

  private enableOrDisableTargetAmount(enable: boolean) {
    const targetAmountControl: AbstractControl = this.convertorForm.get('targetAmount');
    enable ? targetAmountControl.enable() : targetAmountControl.disable();
  }
  // Convert Button handling
  public enableConvertButtonWithText(text: string) {
    this.enableOrDisableConvertButtonWithText(text, true);
  }
  public disableConvertButtonWithText(text: string) {
    this.enableOrDisableConvertButtonWithText(text, false);
  }

  private enableOrDisableConvertButtonWithText(text: string, enable: boolean) {
    const convertButtonControl: AbstractControl = this.convertorForm.get('convertButtonText');
    convertButtonControl.setValue(text);
    this.disableConvertButton = !enable;
  }

  public getCurrencyText(sourceCurrency: string, targetCurrency: string) {
    return 'Convert ' + sourceCurrency + ' to ' + targetCurrency;
  }
  public getConvertButtonText(): string {
    const convertButtonControl: AbstractControl = this.convertorForm.get('convertButtonText');
    return convertButtonControl.value;
  }
  public updateSourceAmount(amount: number) {
    if (this.conversionResult) {
      this.conversionResult.sourceAmount = amount;
      this.conversionResult.targetAmount = amount * this.conversionResult.exchangeRate;
      this.convertorForm.patchValue({ targetAmount: '' });
    }
  }
  public updateTargetAmount(amount: number) {
    if (this.conversionResult) {
      this.conversionResult.targetAmount = amount;
      this.conversionResult.sourceAmount = amount / this.conversionResult.exchangeRate;
      this.convertorForm.patchValue({ sourceAmount: '1' });
    }
  }
}
