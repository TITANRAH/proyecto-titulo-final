
import { Filter } from './../models/filter';
import { Student } from './../models/student';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Class } from '../models/class';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SqliteManagerService {

  db: SQLiteObject = null;

  constructor(
    private sqlite: SQLite
  ) { }

  /**
   * Creacion de la base de datos
   */
  createDatabase() {

    return this.sqlite.create({
      name: 'class.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      this.db = db;

      // sql necesario para crear la base de datos
      let sqlTablaAlumnos = 'CREATE TABLE IF NOT EXISTS "students" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `surname` TEXT, `email` TEXT NOT NULL, `phone` TEXT NOT NULL, `active` INTEGER DEFAULT 1 );';

      let sqlDelAlumnos = 'DELETE FROM students;';

      let sqlAl1 = "INSERT INTO students VALUES (1, 'Juan', 'Perez', 't1@t.com', 1234, 1);";
      let sqlAl2 = "INSERT INTO students VALUES (2, 'Pedro', 'Rincon', 't2@t.com', 1234, 1);";
      let sqlAl3 = "INSERT INTO students VALUES (3, 'Diego', 'Alvarez', 't2@t.com', 1234, 1);";

      let sqlTablaClass = 'CREATE TABLE IF NOT EXISTS "class" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date_start` TEXT, `date_end` TEXT, `id_student` INTEGER NOT NULL, FOREIGN KEY(`id_student`) REFERENCES `id_student`(`id`) );';

      let sqlDelClass = 'DELETE FROM class;';

      let sqlCl1 = "INSERT INTO class VALUES (1, '2020-10-03T15:00', '2020-10-03T16:00', 1);";
      let sqlCl2 = "INSERT INTO class VALUES (2, '2020-10-04T16:00', '2020-10-04T17:00', 2);";
      let sqlCl3 = "INSERT INTO class VALUES (3, '2020-10-05T17:00', '2020-10-05T18:00', 2);";

     

     

      return Promise.all(
        [
          this.db.executeSql(sqlTablaAlumnos, []),
          this.db.executeSql(sqlDelAlumnos, []),
          this.db.executeSql(sqlAl1, []),
          this.db.executeSql(sqlAl2, []),
          this.db.executeSql(sqlAl3, []),
          this.db.executeSql(sqlTablaClass, []),
          this.db.executeSql(sqlDelClass, []),
          this.db.executeSql(sqlCl1, []),
          this.db.executeSql(sqlCl2, []),
          this.db.executeSql(sqlCl3, []),
         
        ]
      ).then(() => {
        return true;
      })


    });

  }

  // Students

  /**
   * Creacion estudiante
   * @param student 
   */
   createStudent(student: Student) {
    const sql = 'INSERT INTO students(name, surname, email, phone) VALUES(?,?,?,?)';
    return this.db.executeSql(sql, [
      student.name,
      student.surname,
      student.email,
      student.phone
    ]);
  }

  /**
   * Obtener estudiantes
   * @param search 
   */
  getStudents(search?: string) {
    let sql = 'SELECT * FROM students';
    if (search) {
      sql += " WHERE lower(name) LIKE '%" + search.toLowerCase() + "%' or lower(surname) LIKE '%" + search.toLowerCase() + "%'";
    }
    return this.db.executeSql(sql, []).then(response => {
      let students = [];
      for (let index = 0; index < response.rows.length; index++) {
        const row = response.rows.item(index);
        let student: Student = row as Student;
        students.push(student);
      }
      return Promise.resolve(students);
    }).catch(error => Promise.reject(error));
  }

  /**
   * Actualizar estudiantes
   * @param student 
   */
  updateStudent(student: Student) {
    let sql = 'UPDATE students SET name=?, surname=?, email=?, phone=? WHERE id=?';
    return this.db.executeSql(sql, [
      student.name,
      student.surname,
      student.email,
      student.phone,
      student.id
    ])
  }

  // clases

  /**
   * Crear clase
   * @param c 
   */
  createClass(c: Class) {
    const sql = 'INSERT INTO class(date_start, date_end, id_student) VALUES(?,?,?)';
    return this.db.executeSql(sql, [
      c.date_start,
      c.date_end,
      c.id_student
    ]);
  }

  /**
   * Obtener clases
   * @param filter 
   */
  getClasses(filter: Filter = null) {
    let sql = 'SELECT * from class WHERE 1 ';
    if (filter) {
      // Filtro fecha inicio
      if (filter.date_start) {
        sql += " and date_start >= '" + moment(filter.date_start).format("YYYY-MM-DDTHH:mm") + "' ";
      }
      // Filtro fecha fin
      if (filter.date_end) {
        sql += " and date_end <= '" + moment(filter.date_end).format("YYYY-MM-DDTHH:mm") + "' ";
      }
      // Filtro  estudiante
      if (filter.id_student) {
        sql += " and id_student = " + filter.id_student + " ";
      }
    }
    sql += 'ORDER BY date_start, date_end';
    return this.db.executeSql(sql, []).then(response => {
      let classes = [];
      for (let index = 0; index < response.rows.length; index++) {
        const row = response.rows.item(index);
        let c: Class = row as Class;
        classes.push(c);
      }
      return Promise.resolve(classes);
    }).catch(error => Promise.reject(error))

  }

  /**
   * Actualizar clases
   * @param c 
   */
  updateClass(c: Class) {
    const sql = 'UPDATE class SET date_start=?, date_end=?, id_student=? WHERE id=?';
    return this.db.executeSql(sql, [
      c.date_start,
      c.date_end,
      c.id_student,
      c.id
    ]);
  }

  /**
   * Borrar clase
   * @param c 
   */
  deleteClass(c: Class) {
    const sql = 'DELETE FROM class WHERE id=?';
    return this.db.executeSql(sql, [
      c.id
    ]);
  }

}
