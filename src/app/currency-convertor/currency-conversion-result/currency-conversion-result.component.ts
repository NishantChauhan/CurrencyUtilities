import { Component, OnInit } from '@angular/core'
import { ConvertedCurrency } from 'src/app/common/currency-conversion'

@Component({
  selector: 'app-currency-conversion-result',
  templateUrl: './currency-conversion-result.component.html',
  styleUrls: ['./currency-conversion-result-component.scss'],
})
export class CurrencyConversionResultComponent implements OnInit {
  convertedCurrency: ConvertedCurrency
  constructor() {}

  ngOnInit() {}
  public updateConversionResult(conversionCurrencyResult: ConvertedCurrency) {
    if (conversionCurrencyResult) {
      this.convertedCurrency = conversionCurrencyResult
    } else {
      this.convertedCurrency = null
    }
  }
}
