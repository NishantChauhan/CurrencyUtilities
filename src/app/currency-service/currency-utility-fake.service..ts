import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRateAPIReponse } from '../common/base-rates';
import { CurrencyUtilityService } from './currency-utility.service';
import { exchangeReponse } from '../mock-response/mock-reponse';
@Injectable({
  providedIn: 'root'
})
export class CurrencyUtilityFakeService extends CurrencyUtilityService {
  public getLatestRatesFromAPI(): Observable<ExchangeRateAPIReponse> {
    return new Observable<ExchangeRateAPIReponse>(subscriber => {
      setTimeout(() => {
        subscriber.next(this.nextExchangeRatesResponse());
      }, 2000);
    });
  }
  public nextExchangeRatesResponse(): ExchangeRateAPIReponse {
    const random = Math.floor(Math.random() * 100);
    exchangeReponse.to = exchangeReponse.from + random / 100;
    return exchangeReponse;
  }
}
