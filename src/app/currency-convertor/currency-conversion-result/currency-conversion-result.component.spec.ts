import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  fixedSourceCurrency,
  fixedTargetCurrency
} from 'src/app/common/base-rates';
import { ConvertorCardComponent } from '../convertor-card/convertor-card.component';
import { CurrencyConversionResultComponent } from './currency-conversion-result.component';

describe('CurrencyConversionResultComponent', () => {
  let component: CurrencyConversionResultComponent;
  let fixture: ComponentFixture<CurrencyConversionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyConversionResultComponent, ConvertorCardComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConversionResultComponent);
    component = fixture.componentInstance;
    component.convertedCurrency = {
      sourceCurrency: fixedSourceCurrency.currencySymbol,
      targetCurrency: fixedTargetCurrency.currencySymbol,
      sourceAmount: 1,
      targetAmount: 51.76,
      exchangeRate: 51.76,
      exchangeResultDate: new Date()
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
