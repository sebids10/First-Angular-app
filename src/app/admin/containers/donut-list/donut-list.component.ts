import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  selector: 'app-donut-list',
  template: `
    <div>
      <div class="donut-list-actions">
        <a routerLink="new" class="btn btn--green">
          New Donut
          <img width="10" height="10" src="/assets/plus.jpg" />
        </a>
      </div>
      <ng-container *ngIf="donuts?.length; else nothing">
        <app-donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        ></app-donut-card>
      </ng-container>

      <ng-template #nothing>
        <p>No Donuts here...</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .donut-list {
        &-actions {
          margin-bottom: 10px;
        }
      }
      a[ng-reflect-router-link] {
        font-family: 'Courier New', Courier, monospace;
        text-decoration: none;
      }
    `,
  ],
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    this.donutService
      .read()
      .subscribe((donuts: Donut[]) => (this.donuts = donuts));
  }
  trackById(index: number, value: Donut) {
    return value.id;
  }
}
