import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ListDataComponent } from './list-data/list-data.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ListDataComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    IonicModule
  ]
})
export class SharedModule { }
