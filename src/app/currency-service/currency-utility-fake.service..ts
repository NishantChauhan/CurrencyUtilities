import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRateAPIReponse } from '../common/fixer-base-rates';
import { CurrencyUtilityService } from './currency-utility.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityFakeService extends CurrencyUtilityService {
  public getLatestRatesFromAPI(): Observable<ExchangeRateAPIReponse> {
    return new Observable<ExchangeRateAPIReponse>(subscriber => {
      setTimeout(() => {
        subscriber.next(this.nextMockResponse());
      }, 2000);
    });
  }
}
