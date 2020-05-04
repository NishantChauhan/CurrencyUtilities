import { Component, OnInit } from '@angular/core'
import { ConvertedCurrency } from 'src/app/common/currency-conversion'

@Component({
  selector: 'app-currency-conversion-result',
  templateUrl: './currency-conversion-result.component.html',
  styleUrls: ['./currency-conversion-result-component.scss'],
})
export class CurrencyConversionResultComponent implements OnInit {
  convertedCurrency: ConvertedCurrency
  enableResult: boolean
  constructor() {
    this.enableResult = true
  }

  ngOnInit() {}
  public updateConversionResult(conversionCurrencyResult: ConvertedCurrency) {
    this.enableResult = true
    this.convertedCurrency = conversionCurrencyResult
  }
  public disableResultComponent() {
    this.enableResult = false
  }
}
