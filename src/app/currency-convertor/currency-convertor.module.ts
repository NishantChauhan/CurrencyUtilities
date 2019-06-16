import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConvertorCardComponent } from './convertor-card/convertor-card.component';
import { CurrencyConversionResultComponent } from './currency-conversion-result/currency-conversion-result.component';

@NgModule({
  declarations: [ConvertorCardComponent, CurrencyConversionResultComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ConvertorCardComponent],
})
export class CurrencyConvertorModule {}
