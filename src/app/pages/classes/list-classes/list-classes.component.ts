import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class';
import { SqliteManagerService } from '../../../services/sqlite-manager.service';
import { Student } from '../../../models/students';
import { InteractionService } from 'src/app/services/interaction.service';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from '../../../models/filter';

@Component({
  selector: 'app-list-classes',
  templateUrl: './list-classes.component.html',
  styleUrls: ['./list-classes.component.scss'],
})
export class ListClassesComponent implements OnInit {

  classes: Class[];
  showForm: boolean;
  classSelected: Class;
  students: Student[];
  filter: Filter

  constructor(private sqliteManagerService : SqliteManagerService,
              private interactionService : InteractionService,
              private translate : TranslateService) { 

    this.classes = [];
    this.students = [];
    this.filter = new Filter;
  }

  ngOnInit() {
    this.getClasses();
  }

  getClasses(){
    // obtengo clases y estudiantes de la base de datos
    Promise.all(
    [
      this.sqliteManagerService.getClasses(this.filter),
      this.sqliteManagerService.getStudents()
    ]).then(results => {
      this.classes = results[0];
      this.students = results[1];
      this.associateStudentsClasses();
      console.log(this.classes);
      
    })

  }

  associateStudentsClasses(){
    // busco el estudiante asociado a la clase el estudiante tiene el id y la clase tiene el id_student
    //busco entre las clases lo recorro y dentro de la clase busco el estudiante asociado a esa clase
    //luego ocupo esta funcion en get clases
    //y luego ocupo la funcion get clases en close form
    this.classes.forEach(c=>{
      let student = this.students.find( s=> s.id === c.id_student);
      c.student = student;

    });
  }

  closeForm(){
    // alñ recibir la emision close desde el componente hijo form se iguala a esta funcion que realiza lo siguiente 
    // dejar en false el mostrar formulario y dejar en null la clase seleccionada
    //cuando cerremos el form recogemos las clases estudiantiles con el estudiante asociado generadas
    this.showForm = false;
    this.classSelected = null;
    this.getClasses()
  }

  editClass(c: Class){
    this.classSelected = c;
    this.showForm = true;
  }

  removeClassConfirm(c: Class){

    // el this no sera aceptado dentro de la funcion por lo que creamos una variable con su nombre 
    const self = this;
    // cuando le demos a eliminar pedira esta confirmacion y llamara al evento de eliminar 
    this.interactionService.presentAlertRemoveClass(
      this.translate.instant('label.confirm'),
      this.translate.instant('label.confirm.message.class'),
      function(){
        self.removeClass(c);
      }
    )
  }

  removeClass(c: Class){
    this.sqliteManagerService.deleteClass(c).then(()=>{
    this.interactionService.presentAlert(
      this.translate.instant('label.success'),
      this.translate.instant('label.success.message.remove.class'));
      this.getClasses();
    }).catch(error => console.error(error))
  }

  filterData(event){
    this.filter = event;
    console.log('filtro',this.filter);
    
    this.getClasses();
  }

}
