import { async, TestBed } from '@angular/core/testing'
import { FormControl } from '@angular/forms'
import { fixedSourceCurrency } from 'src/app/common/base-rates'
import { commonTestingModules, commonTestingProviders } from 'src/app/common/common-testing'
import { CurrencyUtilityService } from 'src/app/currency-service/currency-utility.service'
import { ConvertorCardComponent } from '../convertor-card/convertor-card.component'
import { CurrencyCardErrorComponent } from '../currency-card-error/currency-card-error.component'
import { CurrencyConversionResultComponent } from '../currency-conversion-result/currency-conversion-result.component'
import { CurrencyUtilityFakeService } from './../../currency-service/currency-utility-fake.service.'
import { CurrencySupportValidator, CurrencySupportValidatorDirective } from './currency-support-validator.directive'

describe('CurrencySupportValidatorDirective', () => {
  let utilityService: CurrencyUtilityService
  let validator: CurrencySupportValidator
  let directive: CurrencySupportValidatorDirective
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      declarations: [ConvertorCardComponent, CurrencyConversionResultComponent, CurrencyCardErrorComponent],
      providers: commonTestingProviders,
    }).compileComponents()
    utilityService = TestBed.inject(CurrencyUtilityFakeService)
    validator = new CurrencySupportValidator(utilityService)
    directive = new CurrencySupportValidatorDirective(validator)
  }))
  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })
  it('should return validation errors for unsupported currency', () => {
    const currencyControl: FormControl = new FormControl('QQQ', { asyncValidators: validator.validate.bind(validator) })
    expect(currencyControl.errors?.unSupported).toEqual(true)
  })
  it('should  return success for supported currency', () => {
    const currencyControl: FormControl = new FormControl(fixedSourceCurrency, {
      asyncValidators: validator.validate.bind(validator),
    })
    expect(currencyControl.errors?.unSupported).toBeFalsy()
  })
})
