import { Component, Input, OnInit } from '@angular/core'
import { ResponseStatus } from './../../common/base-rates'

@Component({
  selector: 'app-currency-card-error',
  templateUrl: './currency-card-error.component.html',
  styleUrls: ['./currency-card-error.component.css'],
})
export class CurrencyCardErrorComponent implements OnInit {
  @Input() error: ResponseStatus
  constructor() {}

  ngOnInit(): void {}
}
