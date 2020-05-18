import { Directive, Injectable } from '@angular/core'
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { CurrencyUtilityService } from 'src/app/currency-service/currency-utility.service'

@Injectable({ providedIn: 'root' })
export class CurrencySupportValidator implements AsyncValidator {
  constructor(private utilityService: CurrencyUtilityService) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const supportedCurrency = this.utilityService.getAllSupportedCurrencies().pipe(
      map(supportedCurrencyList => {
        const currencyToFind = ctrl.value.toLowerCase()
        const filteredList = supportedCurrencyList.filter(
          currency => currency.currencySymbol.toLowerCase().indexOf(currencyToFind) === 0
        )
        return filteredList.length > 0 ? null : { unSupported: true }
      }),
      catchError(() => of(null))
    )
    return supportedCurrency
  }
}

@Directive({
  selector: '[appCurrencySupportValidator]',
})
export class CurrencySupportValidatorDirective {
  constructor(private validator: CurrencySupportValidator) {}
}
