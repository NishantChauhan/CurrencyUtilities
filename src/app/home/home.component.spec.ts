import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { commonTestingProviders } from '../common/common-testing'
import { mockMatIconModule } from '../common/mock-mat-icons'
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
    })
      .overrideModule(MatIconModule, mockMatIconModule)
      .compileComponents()
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
