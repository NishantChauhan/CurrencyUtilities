import { async, TestBed } from '@angular/core/testing';
import { ExchangeRateAPIReponse } from '../common/fixer-base-rates';
import { CurrencyUtilityService } from './currency-utility.service';

describe('CurrencyUtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyUtilityService = TestBed.get(CurrencyUtilityService);
    expect(service).toBeTruthy();
  });

  it('should be return mockResponse when latest rates api is invoked', async(() => {
    const service: CurrencyUtilityService = TestBed.get(CurrencyUtilityService);
    let apiResponse;
    service.getLatestRatesFromAPI().subscribe((response: ExchangeRateAPIReponse) => {
      apiResponse = response;
      const mockResponse = service.nextMockResponse();
      expect(mockResponse).toEqual(apiResponse);
    });
  }));

  it('should be return random rates for mockResponse', () => {
    const service: CurrencyUtilityService = TestBed.get(CurrencyUtilityService);
    const response1 = service.nextMockResponse().rates['INR'];
    const response2 = service.nextMockResponse().rates['INR'];
    expect(response1).not.toEqual(response2);
  });
});
