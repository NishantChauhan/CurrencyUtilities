import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyUtilityService } from 'src/app/currency-service/currency-utility.service';
import { mockReponse } from 'src/app/mock-response/mock-reponse';
import { CurrencyConversionResultComponent } from '../currency-conversion-result/currency-conversion-result.component';
import { CurrencyUtilityFakeService } from './../../currency-service/currency-utility-fake.service.';
import { ConvertorCardComponent } from './convertor-card.component';

describe('ConvertorCardComponent', () => {
  let component: ConvertorCardComponent;
  let fixture: ComponentFixture<ConvertorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertorCardComponent, CurrencyConversionResultComponent],
      providers: [
        {
          provide: CurrencyUtilityService,
          useClass: CurrencyUtilityFakeService,
        },
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertorCardComponent);
    component = fixture.componentInstance;
    jasmine.clock().install();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert  CAD to INR', () => {
    component.convertorForm.setValue({
      sourceAmount: 1,
      sourceCurrency: 'CAD',
      targetAmount: '',
      targetCurrency: 'INR',
      convertButtonText: 'Convert CAD to INR',
    });
    for (let i = 0; i < 5; i++) {
      component.convertCurrency();
    }
    jasmine.clock().tick(3000);
    expect(component.convertorForm.get('targetAmount').value).toBe(
      (mockReponse.rates['INR'] / mockReponse.rates['CAD']).toFixed(2)
    );
  });

  it('should update target amount to "" when source amount is updated', () => {
    component.convertorForm.setValue({
      sourceAmount: 1,
      sourceCurrency: 'CAD',
      targetAmount: '',
      targetCurrency: 'INR',
      convertButtonText: 'Convert CAD to INR',
    });
    component.convertCurrency();
    jasmine.clock().tick(3000);
    expect(component.convertorForm.get('targetAmount').value).toBe(
      (mockReponse.rates['INR'] / mockReponse.rates['CAD']).toFixed(2)
    );
    component.updateSourceAmount(100);
    const targetAmount = component.convertorForm.get('targetAmount').value;
    expect(targetAmount).toBe('');
  });

  it('should update source amount to 1 when target amount is updated', () => {
    component.convertorForm.setValue({
      sourceAmount: 1,
      sourceCurrency: 'CAD',
      targetAmount: '',
      targetCurrency: 'INR',
      convertButtonText: 'Convert CAD to INR',
    });
    component.convertCurrency();
    jasmine.clock().tick(3000);
    expect(component.convertorForm.get('targetAmount').value).toBe(
      (mockReponse.rates['INR'] / mockReponse.rates['CAD']).toFixed(2)
    );
    component.updateTargetAmount(100);
    const sourceAmountText = component.convertorForm.get('sourceAmount').value;
    expect(sourceAmountText).toBe('1');
  });

  it('should update convert button on currency change', () => {
    component.convertorForm.patchValue({ sourceCurrency: 'USD' });
    component.updateCurrency();
    const buttonText = component.convertorForm.get('convertButtonText').value;
    expect(buttonText).toBe('Convert USD to INR');
  });

  it('should not update source amount and target amount when conversion result is not evaluated', () => {
    component.convertorForm.setValue({
      sourceAmount: 100,
      sourceCurrency: 'CAD',
      targetAmount: '100',
      targetCurrency: 'INR',
      convertButtonText: 'Convert CAD to INR',
    });
    component.updateTargetAmount(1);
    const sourceAmountText = component.convertorForm.get('sourceAmount').value;
    expect(sourceAmountText).toBe(100);
    component.updateSourceAmount(1);
    const targetAmount = component.convertorForm.get('targetAmount').value;
    expect(targetAmount).toBe('100');
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
