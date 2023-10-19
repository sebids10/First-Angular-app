import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';

import { DonutListComponent } from './admin/containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './admin/containers/donut-single/donut-single.component';

export const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: 'donuts', component: DonutListComponent },
      { path: 'donut', component: DonutSingleComponent },
      { path: '', pathMatch: 'full', redirectTo: 'donuts' },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin',
  },
  {
    path: '**',
    redirectTo: 'admin',
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
