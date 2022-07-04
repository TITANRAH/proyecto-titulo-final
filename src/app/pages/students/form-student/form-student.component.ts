import { AlertService } from './../../../services/alert.service';
import { Student } from './../../../models/student';
import { TranslateService } from '@ngx-translate/core';
import { SqliteManagerService } from './../../../services/sqlite-manager.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss']
})
export class FormStudentComponent implements OnInit {

  @Input() student: Student;
   edit: boolean;

  @Output() close: EventEmitter<boolean>;

  constructor(
    private sqliteManager: SqliteManagerService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    this.edit = false;
    this.close = new EventEmitter<boolean>();
  }

  ngOnInit() {
    // Modo creacion
    if (!this.student) {
      this.student = new Student();
    } else {
      // Modo edicion
      this.edit = true;
    }
  }

  /**
   * Añadir o editar estudiante
   */
  addEditStudent() {

    if (this.edit) {
      // Editar clase
      this.sqliteManager.updateStudent(this.student).then(() => {
        console.log('Se ha actualizado');
        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.edit.student')
        )
        this.closeForm();
      })
    } else {
      // Crear clase
      this.sqliteManager.createStudent(this.student).then(() => {
        console.log('Se ha insertado');
        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.add.student')
        )
        this.closeForm();
      })
    }

  }

  /**
   * Indico que salgo del formulario
   */
  closeForm() {
    this.close.emit(true);
  }

}
