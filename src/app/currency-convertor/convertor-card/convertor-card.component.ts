import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConvertedCurrency, CurrencyConvertorInput } from 'src/app/common/currency-conversion';
import { CurrencyUtilityService } from './../../currency-utility.service';

@Component({
  selector: 'app-convertor-card',
  templateUrl: './convertor-card.component.html',
  styleUrls: ['./convertor-card.component.css'],
})
export class ConvertorCardComponent implements OnInit {
  inputCurrency: CurrencyConvertorInput;
  conversionResult: ConvertedCurrency;

  constructor(private fb: FormBuilder, private utilityService: CurrencyUtilityService) {}

  public convertorForm: FormGroup = this.fb.group({
    sourceAmount: [1, Validators.required],
    sourceCurrency: ['CAD', Validators.required],
    targetAmount: [],
    targetCurrency: ['INR', Validators.required],
    convertButtonText: ['Convert CAD to INR'],
  });
  ngOnInit() {}

  // Convert button handling
  public convertCurrency() {
    this.disableTargetAmount();
    this.setConvertButtonText('Converting....');
    this.inputCurrency = {
      sourceAmount: this.convertorForm.get('sourceAmount').value,
      sourceCurrency: this.convertorForm.get('sourceCurrency').value,
      targetCurrency: this.convertorForm.get('targetCurrency').value,
    };

    this.utilityService.convertCurrency(this.inputCurrency).subscribe((conversionResult: ConvertedCurrency) => {
      setTimeout(() => {
        this.convertorForm.patchValue({ targetAmount: conversionResult.targetAmount });
        this.enableTargetAmount();
        this.setConvertButtonCurrencyText(conversionResult.sourceCurrency, conversionResult.targetCurrency);
      }, 2000);
    });
  }

  public setConvertButtonText(text: string) {
    const convertButtonControl: AbstractControl = this.convertorForm.get('convertButtonText');
    convertButtonControl.setValue(text);
  }
  public setConvertButtonCurrencyText(sourceCurrency: string, targetCurrency: string) {
    const convertButtonControl: AbstractControl = this.convertorForm.get('convertButtonText');
    convertButtonControl.setValue('Convert ' + sourceCurrency + ' to ' + targetCurrency);
  }
  public getConvertButtonText(): string {
    const convertButtonControl: AbstractControl = this.convertorForm.get('convertButtonText');
    return convertButtonControl.value;
  }

  public updateCurrency() {
    const sourceCurrency: string = this.convertorForm.get('sourceCurrency').value;
    const targetCurrency: string = this.convertorForm.get('targetCurrency').value;
    this.setConvertButtonCurrencyText(sourceCurrency, targetCurrency);
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
}
