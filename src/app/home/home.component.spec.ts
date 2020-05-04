import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { commonTestingProviders } from '../common/common-testing'
import { commonTestingModules } from './../common/common-testing'
import { ConvertorCardComponent } from './../currency-convertor/convertor-card/convertor-card.component'
import { CurrencyConversionResultComponent } from './../currency-convertor/currency-conversion-result/currency-conversion-result.component'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      declarations: [HomeComponent, ConvertorCardComponent, CurrencyConversionResultComponent],
      providers: commonTestingProviders,
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
