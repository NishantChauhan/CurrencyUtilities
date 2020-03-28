import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { fixedSourceCurrency } from 'src/app/mock-response/mock-reponse';
import { ConvertorCardComponent } from '../convertor-card/convertor-card.component';
import { fixedTargetCurrency } from './../../mock-response/mock-reponse';
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
      sourceCurrency: fixedSourceCurrency,
      targetCurrency: fixedTargetCurrency,
      sourceAmount: 1,
      targetAmount: 51.76,
      exchangeRate: 51.76,
      exchangeResultDate: new Date(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
