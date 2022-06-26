import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ListStudentsComponent } from '../list-students/list-students.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormStudentComponent } from '../form-student/form-student.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
    
  ],
  declarations: [
    Tab1Page,
    ListStudentsComponent,
    FormStudentComponent
  ]
})
export class Tab1PageModule {}
