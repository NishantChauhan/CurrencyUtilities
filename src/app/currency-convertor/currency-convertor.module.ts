import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConvertorCardComponent } from './convertor-card/convertor-card.component';

@NgModule({
  declarations: [ConvertorCardComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ConvertorCardComponent],
})
export class CurrencyConvertorModule {}
