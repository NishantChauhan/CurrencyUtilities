import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { commonTestingModules, commonTestingProviders } from './../common/common-testing'
import { AboutComponent } from './about.component'

describe('AboutComponent', () => {
  let component: AboutComponent
  let fixture: ComponentFixture<AboutComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      declarations: [AboutComponent],
      providers: commonTestingProviders,
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
