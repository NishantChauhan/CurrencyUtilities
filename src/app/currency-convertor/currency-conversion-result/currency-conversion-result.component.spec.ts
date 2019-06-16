import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConvertorCardComponent } from '../convertor-card/convertor-card.component';
import { CurrencyConversionResultComponent } from './currency-conversion-result.component';

describe('CurrencyConversionResultComponent', () => {
  let component: CurrencyConversionResultComponent;
  let fixture: ComponentFixture<CurrencyConversionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyConversionResultComponent, ConvertorCardComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConversionResultComponent);
    component = fixture.componentInstance;
    component.convertedCurrency = {
      sourceCurrency: 'CAD',
      targetCurrency: 'INR',
      sourceAmount: 1,
      targetAmount: 51.76,
      exchangeRate: 51.76,
      exchangeResultDate: new Date().toString(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
