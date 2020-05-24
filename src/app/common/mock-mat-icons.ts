import { Component, Input } from '@angular/core'
import { MatIcon } from '@angular/material/icon'

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mat-icon',
  template: '<span></span>',
})
class MockMatIconComponent {
  @Input() svgIcon: any
  @Input() fontSet: any
  @Input() fontIcon: any
}
export const mockMatIconModule = {
  remove: {
    declarations: [MatIcon],
    exports: [MatIcon],
  },
  add: {
    declarations: [MockMatIconComponent],
    exports: [MockMatIconComponent],
  },
}
