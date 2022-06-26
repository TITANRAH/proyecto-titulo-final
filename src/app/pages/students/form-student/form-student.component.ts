import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../../../models/students';
import { SqliteManagerService } from '../../../services/sqlite-manager.service';
import { TranslateService } from '@ngx-translate/core';
import { InteractionService } from '../../../services/interaction.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss'],
})
export class FormStudentComponent implements OnInit {

  @Input() student: Student;
  // para cerrar el formulario que se sepa 
  @Output() close: EventEmitter<boolean>

  edit: boolean;

  constructor(private sqliteManagerService : SqliteManagerService,
              private translate : TranslateService,
              private interactionService : InteractionService) { 

                this.edit = false;
                this.close = new EventEmitter<boolean>()
              }

  ngOnInit() {

    // si estudiante no existe crea uno
    // si no el editar es true
    if(!this.student){
        this.student = new Student();
    } else {
      this.edit = true;
    }
  }

  // añado a un estudiante y luego cierro el form
  addEditStudent(){
    if(this.edit){
      this.sqliteManagerService.updateStudent(this.student).then(()=>{

        console.log('se ha actualizado');
        this.interactionService.presentAlert(this.translate.instant('label.success'),
                                             this.translate.instant('label.success.message.edit.student'));
      })
    }else{
      this.sqliteManagerService.createStudent(this.student).then(()=>{
        this.closeForm();
      })
    }
  }

  closeForm(){
    // si se cierra el form emite un true por que el event emitter es booleano
    this.close.emit(true)
  }

}
