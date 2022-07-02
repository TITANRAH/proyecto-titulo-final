import { SqliteManagerService } from './../../../services/sqlite-manager.service';
import { Student } from './../../../models/student';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  public students: Student[];
  public studentSelected: Student;
  public showForm: boolean;

  constructor(
    private sqliteManager: SqliteManagerService
  ) {
    this.students = [];
    this.showForm = false;
  }

  ngOnInit() {
    this.getStudents();
  }

  /**
   * Obtengo los estudiantes dado un filtro
   * @param search 
   */
  getStudents(search?: string) {
    this.sqliteManager.getStudents(search).then(students => {
      this.students = students;
      console.log(students);
    })
  }

  /**
   * Cerrar el formulario
   */
  closeForm() {
    this.showForm = false;
    this.studentSelected = null;
    this.getStudents();
  }

  /**
   * Edita un estudiante
   * @param student 
   */
  editStudent(student: Student) {
    this.studentSelected = student;
    this.showForm = true;
  }

  /**
   * Filtramos estudiantes
   * @param $event 
   */
  filterList($event) {
    console.log($event);
    this.getStudents($event.currentTarget.value);
  }

}
