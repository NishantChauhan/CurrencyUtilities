import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../material.module'
import { CurrencyUtilityFakeService } from './../currency-service/currency-utility-fake.service.'
import { CurrencyUtilityService } from './../currency-service/currency-utility.service'

export const commonTestingModules: any[] = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  HttpClientModule,
  BrowserAnimationsModule,
]
export const commonTestingProviders: any[] = [
  {
    provide: CurrencyUtilityService,
    useClass: CurrencyUtilityFakeService,
  },
]
