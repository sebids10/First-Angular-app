import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//containers
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';


//components
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { DonutFormComponent } from './component/donut-form/donut-form.component';

//services

//guars

//directives
@NgModule({
  declarations: [
    DonutListComponent,
    DonutSingleComponent,
    DonutCardComponent,
    DonutFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],

  exports: [DonutListComponent, DonutSingleComponent]
})
export class AdminModule { }
