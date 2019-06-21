import { async, TestBed } from '@angular/core/testing';
import { CurrencyUtilityFakeService } from './currency-utility-fake.service.';
import {
  ICurrencyUtilityService,
  CurrencyUtilityService
} from './currency-utility.service';
import { HttpClientModule } from '@angular/common/http';
import {
  CurrencyConvertorInput,
  ConvertedCurrency
} from '../common/currency-conversion';
import { exchangeReponse } from '../mock-response/mock-reponse';
import { Observable } from 'rxjs';
import { ExchangeRateAPIReponse } from '../common/base-rates';

describe('CurrencyUtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    jasmine.clock().install();
  });

  it('should be created', () => {
    const service: ICurrencyUtilityService = TestBed.inject(
      CurrencyUtilityFakeService
    );
    expect(service).toBeTruthy();
  });
  it(
    'should be convert 1 CAD to ' + exchangeReponse.conversionRate + ' INR',
    () => {
      const service: ICurrencyUtilityService = TestBed.inject(
        CurrencyUtilityFakeService
      );
      const inputCurrency: CurrencyConvertorInput = {
        sourceAmount: 1,
        sourceCurrency: 'CAD',
        targetCurrency: 'INR'
      };
      let convertedCurrency;
      service
        .convertCurrency(inputCurrency)
        .subscribe((result: ConvertedCurrency) => {
          convertedCurrency = result;
        });
      jasmine.clock().tick(3000);
      expect(convertedCurrency).toBeTruthy();
      expect(convertedCurrency.targetAmount).toBe(
        inputCurrency.sourceAmount * exchangeReponse.conversionRate
      );
      expect(convertedCurrency.targetCurrency).toBe(
        inputCurrency.targetCurrency
      );
      expect(convertedCurrency.sourceCurrency).toBe(
        inputCurrency.sourceCurrency
      );
      expect(convertedCurrency.sourceAmount).toBe(exchangeReponse.amount);
    }
  );

  it('should be return actual endpoint subscription for exhange rate backend API', () => {
    const service: CurrencyUtilityService = TestBed.inject(
      CurrencyUtilityService
    );
    const inputCurrency: CurrencyConvertorInput = {
      sourceAmount: 1,
      sourceCurrency: 'CAD',
      targetCurrency: 'INR'
    };

    const exchangeAPIendpoint: Observable<ExchangeRateAPIReponse> = service.getLatestRatesFromAPI(
      inputCurrency
    );
    expect(exchangeAPIendpoint).toBeTruthy();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
