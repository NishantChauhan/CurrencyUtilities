import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { commonTestingProviders } from '../common/common-testing'
import { commonTestingModules } from './../common/common-testing'
import { PageNotFoundComponent } from './page-not-found.component'

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent
  let fixture: ComponentFixture<PageNotFoundComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      declarations: [PageNotFoundComponent],
      providers: commonTestingProviders,
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
