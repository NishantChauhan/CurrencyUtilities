import { Component, ViewEncapsulation } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('currency', sanitizer.bypassSecurityTrustResourceUrl('assets/currency.svg'))
    iconRegistry.addSvgIcon('refresh', sanitizer.bypassSecurityTrustResourceUrl('assets/refresh.svg'))
    iconRegistry.addSvgIcon('swap_vertical', sanitizer.bypassSecurityTrustResourceUrl('assets/swap_vertical.svg'))
    iconRegistry.addSvgIcon('arrow_downward', sanitizer.bypassSecurityTrustResourceUrl('assets/arrow_downward.svg'))
  }
}
