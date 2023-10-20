import { Component, Input } from '@angular/core';
import { Donut } from '../../models/donut.model';
@Component({
  selector: 'app-donut-card',
  template: `
    <a class="donut-card" [routerLink]="donut.id"  [ngClass]="{  }">
      <img
        src="assets/{{ donut.icon }}.jpg"
        [alt]="donut.name"
        class="donut-card-icon"
      />
      <div>
        <p class="donut-card-name">
          {{ donut.name }}
          <ng-container *ngIf="donut.promo" [ngSwitch]="donut.promo">
            <span class="donut-card-label">
              <ng-template [ngSwitchCase]="'new'"> NEW </ng-template>
              <ng-template [ngSwitchCase]="'limited'"> LIMITED </ng-template>
              <ng-template ngSwitchDefault> Nothing Special </ng-template>
            </span>
          </ng-container>
        </p>
        <p class="donut-card-price">
          {{ donut.price / 100 | currency : 'USD' : 'symbol' }}
        </p>
      </div>
    </a>
  `,
  styleUrls: ['./donut-card.component.scss'],
})
export class DonutCardComponent {
  @Input() donut!: Donut;

  constructor() {}
}
