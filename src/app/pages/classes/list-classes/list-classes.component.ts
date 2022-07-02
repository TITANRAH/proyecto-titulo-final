
import { Filter } from './../../../models/filter';
import { AlertService } from './../../../services/alert.service';
import { Student } from './../../../models/student';
import { SqliteManagerService } from './../../../services/sqlite-manager.service';
import { Class } from './../../../models/class';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-classes',
  templateUrl: './list-classes.component.html',
  styleUrls: ['./list-classes.component.css']
})
export class ListClassesComponent implements OnInit {

  public classes: Class[];
  public showForm: boolean;
  public classSelected: Class;
  public students: Student[];
  public filter: Filter;

  constructor(
    private slqiteManager: SqliteManagerService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    this.classes = [];
    this.students = [];
   
    this.filter = new Filter();
  }

  ngOnInit() {
    this.getClasses();
  }

  getClasses() {

    // Obtenemos las clases, estudiantes y pagos.
    Promise.all(
      [
        this.slqiteManager.getClasses(this.filter),
        this.slqiteManager.getStudents(),
        
      ]
    ).then(results => {
      this.classes = results[0];
      this.students = results[1];
     
      this.associateStudentsClasess();
     
      console.log(this.classes);
    })

  }

  /**
   * Asociamos las clases y los estudiantes
   */
  associateStudentsClasess() {
    this.classes.forEach(c => {
      let student = this.students.find(s => s.id === c.id_student);
      c.student = student;
    })
  }



  /**
   * Reseteamos y volvemos a pedir las clases
   */
  closeForm() {
    this.showForm = false;
    this.classSelected = null;
    this.getClasses();
  }

  /**
   * Seleccionamos la clase a editar y mostramos el formulario
   * @param c 
   */
  editClass(c: Class) {
    this.classSelected = c;
    this.showForm = true;
  }

  /**
   * Confirmarmos la eliminacion de la clase
   * @param c 
   */
  removeClassConfirm(c: Class) {
    const self = this;
    this.alertService.alertConfirm(
      this.translate.instant('label.confirm'),
      this.translate.instant('label.confirm.message.class'),
      function () {
        self.removeClass(c);
      }
    )
  }

  /**
   * Eliminar unaclase
   * @param c 
   */
  removeClass(c: Class) {
    this.slqiteManager.deleteClass(c).then(() => {
      this.alertService.alertSuccess(
        this.translate.instant('label.success'),
        this.translate.instant('label.success.message.remove.class')
      );
      this.getClasses();
    }).catch(error => console.error(error))
  }

  /**
   * Filtrado de datos
   * @param $event 
   */
  filterData($event) {
    this.filter = $event;
    console.log(this.filter);
    this.getClasses();
  }

  /**
   * Pagar una clase
   * @param c 
   */
  

}
