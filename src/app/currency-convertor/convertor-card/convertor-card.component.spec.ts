import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConvertorCardComponent } from './convertor-card.component';

describe('ConvertorCardComponent', () => {
  let component: ConvertorCardComponent;
  let fixture: ComponentFixture<ConvertorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertorCardComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
