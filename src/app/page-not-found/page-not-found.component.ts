import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-page-not-found',
  template: `<mat-card class="card-page" style="text-align: left;">
    <mat-card-header>
      <mat-card-title>Oops! Wrong Way</mat-card-title>
      <mat-card-subtitle>404 - Page Not Found</mat-card-subtitle>
    </mat-card-header>
  </mat-card>`,
  styles: [],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
