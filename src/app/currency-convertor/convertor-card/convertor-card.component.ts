import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyUtilityService } from './../../currency-utility.service';

@Component({
  selector: 'app-convertor-card',
  templateUrl: './convertor-card.component.html',
  styleUrls: ['./convertor-card.component.css'],
})
export class ConvertorCardComponent implements OnInit {
  constructor(private fb: FormBuilder, private utilityService: CurrencyUtilityService) {}
  public convertorForm: FormGroup = this.fb.group({
    sourceAmount: [1, Validators.required],
    sourceCurrency: ['CAD', Validators.required],
    targetAmount: [],
    targetCurrency: ['INR', Validators.required],
    convertButtonText: ['Convert CAD to INR'],
  });
  ngOnInit() {}
  public convertCurrency() {
    // Disable Target Amount
    this.enableTargetAmount(false);
    // Show Converting on the button
    this.setConvertButtonText('Converting....');
    const sourceAmount: number = this.convertorForm.get('sourceAmount').value;
    const sourceCurrency: string = this.convertorForm.get('sourceCurrency').value;
    const targetCurrency: string = this.convertorForm.get('targetCurrency').value;

    this.utilityService.convertCurrency(sourceAmount, sourceCurrency, targetCurrency).subscribe(convertedAmount => {
      setTimeout(() => {
        this.convertorForm.patchValue({ targetAmount: convertedAmount });
        this.enableTargetAmount(true);
        this.setConvertButtonCurrencyText(sourceCurrency, targetCurrency);
      }, 2000);
    });
  }

  public enableTargetAmount(enable: boolean) {
    const targetAmountControl: AbstractControl = this.convertorForm.get('targetAmount');
    enable ? targetAmountControl.enable() : targetAmountControl.disable();
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
}
