import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyUtilityService {
  constructor() {}

  public convertCurrency(sourceAmount: number, sourceCurrency: string, targetCurrency: string): Observable<number> {
    if (sourceCurrency === 'CAD' && targetCurrency === 'INR') {
      return of(sourceAmount * 51.78);
    }
    if (sourceCurrency === 'CAD' && targetCurrency === 'USD') {
      return of((sourceAmount * 51.78) / 67.17);
    }
    if (sourceCurrency === 'USD' && targetCurrency === 'CAD') {
      return of((sourceAmount * 67.17) / 51.78);
    }
    if (sourceCurrency === 'USD' && targetCurrency === 'INR') {
      return of(sourceAmount * 67.17);
    }

    if (sourceCurrency === 'INR' && targetCurrency === 'USD') {
      return of(sourceAmount * (1 / 67.17));
    }
    if (sourceCurrency === 'INR' && targetCurrency === 'CAD') {
      return of(sourceAmount * (1 / 51.78));
    }
    return of(1.0);
  }
}
