
import { AlertService } from './../../../services/alert.service';
import { SqliteManagerService } from './../../../services/sqlite-manager.service';
import { Student } from './../../../models/student';
import { Class } from './../../../models/class';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-form-classes',
  templateUrl: './form-classes.component.html',
  styleUrls: ['./form-classes.component.css']
})
export class FormClassesComponent implements OnInit {

  @Input() classObj: Class;
 
  public edit: boolean;
  public students: Student[];
  public load: boolean;
  

  @Output() close: EventEmitter<boolean>;

  constructor(
    private sqliteManager: SqliteManagerService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    this.close = new EventEmitter<boolean>();
    this.students = [];
    
  }

  ngOnInit() {

    // Modo creacion
    if (!this.classObj) {
      this.classObj = new Class();
      
     
      this.edit = false;
      this.load = true;
      
    } else {
      // Modo edicion
      this.edit = true;


    }

    // Recogo los estudiantes
    this.sqliteManager.getStudents().then(students => {
      this.students = students;
    })
  }

  addEditClass() {

    // Formateamos las fechas
    this.classObj.date_start = moment(this.classObj.date_start).format("YYYY-MM-DDTHH:mm");
    this.classObj.date_end = moment(this.classObj.date_end).format("YYYY-MM-DDTHH:mm");

    if (this.edit) {

      // Actualiza la clase
      this.sqliteManager.updateClass(this.classObj).then(c => {


        console.log(c);
        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.edit.class')
        );
        this.closeForm();
      })

    } else {
      // Creamos la clase
      this.sqliteManager.createClass(this.classObj).then(c => {

        console.log(c);

        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.add.class')
        );
        this.closeForm();
      })
    }


  }

  /**
   * Indicamos que cerramos el formulario
   */
  closeForm() {
    this.close.emit(true);
  }

}
