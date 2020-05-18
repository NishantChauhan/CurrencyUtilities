import { LayoutModule } from '@angular/cdk/layout'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AboutComponent } from './about/about.component'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NoCacheHeadersInterceptor } from './common/interceptors/NoCacheHeaderInterceptor'
import { CurrencyConvertorModule } from './currency-convertor/currency-convertor.module'
import { HomeComponent } from './home/home.component'
import { MaterialModule } from './material.module'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { UnderConstructionComponent } from './under-construction/under-construction.component'
@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, PageNotFoundComponent, UnderConstructionComponent],
  imports: [
    BrowserModule,
    CurrencyConvertorModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
