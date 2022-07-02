import { FormsModule } from '@angular/forms';
import { FilterPageComponent } from './filter/filter-page/filter-page.component';
import { FilterComponent } from './filter/filter.component';
import { ListDataComponent } from './list-data/list-data.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild()
  ],
  declarations: [
    ListDataComponent,
    FilterComponent,
    FilterPageComponent
  ],
  exports: [
    ListDataComponent,
    FilterComponent,
    FilterPageComponent
  ]
})
export class SharedModule { }
