import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ListDataComponent } from './list-data/list-data.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilterComponent } from './filter/filter.component';

import { FormsModule } from '@angular/forms';
import { FilterPageComponent } from './filter/filter-page/filter-page.component';


@NgModule({
  declarations: [
    ListDataComponent,
    FilterComponent,
    FilterPageComponent
   
  ],
  exports:[
    ListDataComponent,
    FilterComponent,
    FilterPageComponent
    
  ],

  imports: [
    FormsModule,
    CommonModule,
    SharedRoutingModule,
    IonicModule,
    TranslateModule.forChild()
  ]
})
export class SharedModule { }
