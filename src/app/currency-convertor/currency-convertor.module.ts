import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { ConvertorCardComponent } from './convertor-card/convertor-card.component'
import { CurrencyCardErrorComponent } from './currency-card-error/currency-card-error.component'
import { CurrencyConversionResultComponent } from './currency-conversion-result/currency-conversion-result.component'

@NgModule({
  declarations: [ConvertorCardComponent, CurrencyConversionResultComponent, CurrencyCardErrorComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [ConvertorCardComponent],
})
export class CurrencyConvertorModule {}
