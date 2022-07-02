import { SharedModule } from './../../../shared/shared.module';
import { FormClassesComponent } from './../form-classes/form-classes.component';
import { ListClassesComponent } from './../list-classes/list-classes.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [
    Tab2Page,
    ListClassesComponent,
    FormClassesComponent
  ]
})
export class Tab2PageModule {}
