import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyUtilityService } from 'src/app/currency-service/currency-utility.service';
import { mockReponse } from 'src/app/mock-response/mock-reponse';
import { CurrencyUtilityFakeService } from './../../currency-service/currency-utility-fake.service.';
import { ConvertorCardComponent } from './convertor-card.component';

describe('ConvertorCardComponent', () => {
  let component: ConvertorCardComponent;
  let fixture: ComponentFixture<ConvertorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertorCardComponent],
      providers: [{ provide: CurrencyUtilityService, useClass: CurrencyUtilityFakeService }],
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
    component.convertCurrency();
    jasmine.clock().tick(3000);
    expect(component.convertorForm.get('targetAmount').value).toBe(
      (mockReponse.rates['INR'] / mockReponse.rates['CAD']).toFixed(2)
    );
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
