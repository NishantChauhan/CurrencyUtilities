import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { commonTestingProviders } from '../common/common-testing'
import { commonTestingModules } from './../common/common-testing'
import { UnderConstructionComponent } from './under-construction.component'

describe('UnderConstructionComponent', () => {
  let component: UnderConstructionComponent
  let fixture: ComponentFixture<UnderConstructionComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      declarations: [UnderConstructionComponent],
      providers: commonTestingProviders,
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderConstructionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
