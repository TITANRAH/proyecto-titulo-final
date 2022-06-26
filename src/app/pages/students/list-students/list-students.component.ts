import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/students';
import { SqliteManagerService } from '../../../services/sqlite-manager.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent implements OnInit {


  
  students: Student[];

  // este sera el input que recibira el componente hijo app form student
  studentSelected: Student;

  // cuando tengamos un fomrulario de añadir sera un boolean para mostrar o no
  showForm: boolean;

  constructor(private sqliteManager: SqliteManagerService) {
    this.students = [];
    this.showForm = false;
   }

  ngOnInit() {
    this.getStudents()
  }

  getStudents(search?: string){
    this.sqliteManager.getStudents(search).then(students =>{
      this.students = students;
      console.log('estudiantes ->',students);
      
    });
  }

  closeForm(){
    this.showForm = false;
    this.studentSelected = null;
    this.getStudents();
  }

  editStudent(student: Student){
    this.studentSelected = student;
    this.showForm = true;
  }

  filterList(event){
      console.log(event);
      // puede ser target.value tambien 
      this.getStudents(event.currentTarget.value)
  }
}
