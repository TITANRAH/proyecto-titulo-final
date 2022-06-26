import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Class } from 'src/app/models/class';
import { Student } from '../../../models/students';
import { SqliteManagerService } from '../../../services/sqlite-manager.service';
import { InteractionService } from '../../../services/interaction.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientJsonpModule } from '@angular/common/http';
import { identity } from 'rxjs';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-form-classes',
  templateUrl: './form-classes.component.html',
  styleUrls: ['./form-classes.component.scss'],
})
export class FormClassesComponent implements OnInit {

  // este componente hijo recibira el input de la clase
  @Input() classObj: Class;

  paid: boolean;
  edit: boolean;
  // necesito cargar los estudiantes que hay 
  students: Student[]

  // este componente hijo emitira un evento al componente padre
  @Output() close: EventEmitter<boolean>;

  constructor(private sqliteManagerService: SqliteManagerService,
              private interactionService: InteractionService,
              private translate: TranslateService) { 

                
                this.close = new EventEmitter<boolean>();
                this.students = [];
                this.paid = false;

                
              }

  ngOnInit() {

    // si el input de clase objeto que recibe este componente hijo 
    // no existe, crea uno nuevo , si no la variable edit pasa a true
    // el precio comienza por defecto en 0
    if(!this.classObj){
      this.classObj = new Class();
      this.classObj.price = 0;
      this.edit = false;
    } else {
      this.edit = true
    }
    // obtengo al cargar este componente hijo los estudiantes estudiantes
    // y los igualo a la variable students
    //con esto puedo hacer el ngfor del html
    this.sqliteManagerService.getStudents().then( students =>{
      this.students = students;
    })

  }

  // emito el evento de cerrar formulario al compponente padre list clases
  closeForm(){
    this.close.emit(true);
  }

  addEditClass(){

      if(this.edit){
        this.sqliteManagerService.updateClass(this.classObj).then(() =>{
          console.log('se ha actualizado la clase');
            this.interactionService.presentAlert(this.translate.instant('label.success'),
                                                 this.translate.instant('label.success.message.edit.class')   )
            });

      }else{

          this.sqliteManagerService.createClass(this.classObj).then(() =>{ 
            this.closeForm();  
            });              
      }
  }
}
