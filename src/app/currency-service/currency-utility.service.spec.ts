import { TestBed } from '@angular/core/testing';

import { CurrencyUtilityService } from './currency-utility.service';

describe('CurrencyUtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyUtilityService = TestBed.get(CurrencyUtilityService);
    expect(service).toBeTruthy();
  });
});
