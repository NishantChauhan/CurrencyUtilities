import { Component, Input, OnInit } from '@angular/core';
import { ConvertedCurrency } from 'src/app/common/currency-conversion';

@Component({
  selector: 'app-currency-conversion-result',
  templateUrl: './currency-conversion-result.component.html',
  styleUrls: ['./currency-conversion-result.component.css']
})
export class CurrencyConversionResultComponent implements OnInit {
  @Input() convertedCurrency: ConvertedCurrency;
  constructor() {}

  ngOnInit() {}
}
