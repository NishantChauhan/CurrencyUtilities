import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-under-construction',
  template: `<mat-card class="card-page">
    <mat-card-content>
      <div>
        <strong>This part of app is under construction.</strong>
      </div>
    </mat-card-content>
  </mat-card>`,
  styles: [],
})
export class UnderConstructionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
