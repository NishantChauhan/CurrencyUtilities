import { Component } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { commonTestingProviders } from 'src/app/common/common-testing'
import { commonTestingModules } from './../../common/common-testing'
import { CurrencyCardErrorComponent } from './currency-card-error.component'

describe('CurrencyCardErrorComponent', () => {
  @Component({
    template: ' <app-currency-card-error [error]="backendError"></app-currency-card-error> ',
  })
  class TestConvertorCardComponent {
    backendError = {
      status: 'Failed',
      errorCode: 'Unknown Error',
      errorDescription: 'Its not you, its us. We are working on fixing this for you.',
    }
  }
  let testComponent: TestConvertorCardComponent
  let fixture: ComponentFixture<TestConvertorCardComponent>
  let errorAlert

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyCardErrorComponent, TestConvertorCardComponent],
      providers: commonTestingProviders,
      imports: [commonTestingModules],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConvertorCardComponent)
    testComponent = fixture.componentInstance
    errorAlert = fixture.nativeElement.querySelector('.convertor-alert-error')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(testComponent).toBeTruthy()
  })
  it('should create', () => {
    expect(errorAlert.textContent).toBe('Unknown Error' + 'Its not you, its us. We are working on fixing this for you.')
  })
})
