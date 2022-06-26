import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Class } from '../models/class';
import { Student } from '../models/students';
import { Filter } from '../models/filter';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class SqliteManagerService {

  db: SQLiteObject = null;
  
  constructor(private sqlite: SQLite) { 

  }
 
  createDateBase(){

    return this.sqlite.create({
      name:'class.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      this.db = db

      let sqlTablaAlumnos = 'CREATE TABLE IF NOT EXISTS "students" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `surname` TEXT, `email` TEXT NOT NULL, `phone` TEXT NOT NULL, `active` INTEGER DEFAULT 1 );';

      let sqlDelAlumnos = 'DELETE FROM students;';

      let sqlAl1 = "INSERT INTO students VALUES (1, 'Fer', 'Ure', 't1@t.com', '123456', 1);";

      let sqlAl2 = "INSERT INTO students VALUES (2, 'Nando', 'Ure', 't2@t.com', '654321', 1);";

      let sqlAl3 = "INSERT INTO students VALUES (3, 'Ricardo', 'Hervas', 't2@t.com', '159753', 1);";      

      let sqlTablaClass = 'CREATE TABLE IF NOT EXISTS "class" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date_start` TEXT, `date_end` TEXT, `id_student` INTEGER NOT NULL, `price` REAL NOT NULL, FOREIGN KEY(`id_student`) REFERENCES `id_student`(`id`) );';
      
      let sqlDelClass = 'DELETE FROM class;';

      let sqlCl1 = "INSERT INTO class VALUES (1, '2020-10-03T15:00', '2020-10-03T16:00', 1, 10000);";
      
      let sqlCl2 = "INSERT INTO class VALUES (2, '2020-10-04T16:00', '2020-10-04T17:00', 2, 20000);";
      
      let sqlCl3 = "INSERT INTO class VALUES (3, '2020-10-05T17:00', '2020-10-05T18:00', 2, 15000);";


      let sqlTablaPayment = 'CREATE TABLE IF NOT EXISTS "payment" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date` TEXT, `id_class` INTEGER NOT NULL, `paid` REAL DEFAULT 0, FOREIGN KEY(`id_class`) REFERENCES `class`(`id`) );';

      let sqlDelPay =' DELETE FROM payment;';

      return Promise.all([

        this.db.executeSql(sqlTablaAlumnos,[]),
        this.db.executeSql(sqlDelAlumnos,[]),
        this.db.executeSql(sqlAl1,[]),
        this.db.executeSql(sqlAl2,[]),
        this.db.executeSql(sqlAl3,[]),
        this.db.executeSql(sqlTablaClass,[]),
        this.db.executeSql(sqlDelClass,[]),
        this.db.executeSql(sqlCl1,[]),
        this.db.executeSql(sqlCl2,[]),
        this.db.executeSql(sqlCl3,[]),
        this.db.executeSql(sqlTablaPayment,[]),
        this.db.executeSql(sqlDelPay,[]), 

      ]).then(()=>{
        return true
      })

      

    });
      
  }

  // usamos esta funcion en el form
  createStudent(student: Student){
    
    const sql= 'INSERT INTO students(name, surname, email, phone) VALUES(?,?,?,?)';

    return this.db.executeSql(sql,[
      student.name,
      student.surname,
      student.email,
      student.phone
    ]);
  }

  getStudents(search?: string){

    
    let sql = 'SELECT * FROM students';

    // este if me sirve para la busqueda por letras mayusculas o minusculas en el filtro
    if(search){
      sql += " WHERE lower(name) LIKE '%" + search.toLowerCase() + "%' or lower(surname) LIKE '%" + search.toLowerCase() + "%'";
    }

    return this.db.executeSql(sql,[]).then( response => {
      
      let students = [];
      for ( let index = 0; index < response.rows.length; index++){
        // convertimos el row a estudiante
        const row = response.rows.item(index);
        let student: Student = row as Student;
        students.push(student);

      }
      return Promise.resolve(students);
    }).catch( error => Promise.reject(error));

  }

  // esta funcion se va al formulario
  updateStudent(student: Student){
    let sql = 'UPDATE students SET name=?, surname=?, email=?, phone=? WHERE id=?';
    return this.db.executeSql(sql, [
      student.name,
      student.surname,
      student.email,
      student.phone,
      student.id
    ])
  }

  // CLASES

  createClass(c: Class){
    const sql = 'INSERT INTO class(date_start, date_end, id_student, price) VALUES(?,?,?,?)';

    return this.db.executeSql(sql,[
      c.date_start,
      c.date_end,
      c.id_student,
      c.price
    ]);

  }

  getClasses(filter: Filter = null){

    // esto sirve para varias consultas que son opcionales el 1 es como un true
    let sql = 'SELECT * from class WHERE 1 ';

    if(filter){
      if(filter.date_start){
        sql += " and date_start >= '" + filter.date_start + "' ";
      }
      if(filter.date_end){
        sql += " and date_end <= '" + filter.date_end+ "' ";
      }
      if(filter.id_student){
        sql += " and id_student = " + filter.id_student + " ";
      }
    }

    sql += 'ORDER BY date_start, date_end';

    return this.db.executeSql(sql, []).then(response => {

      let classes = [];

      for(let index = 0; index < response.rows.length; index++){
        const row = response.rows.item(index);
        let c: Class = row as Class;
        classes.push(c);
      }

      return Promise.resolve(classes);
    }).catch(error => Promise.reject(error));
  }

  updateClass(c: Class){
    let sql = 'UPDATE class SET date_start=?, date_end=?, id_student=?, price=? WHERE id=?';
    return this.db.executeSql(sql, [

      c.date_start,
      c.date_end,
      c.id_student,
      c.price,
      c.id
    ])
    

  }

  deleteClass(c: Class){

    const sql = 'DELETE FROM class WHERE id=?';

    return this.db.executeSql(sql, [
      c.id
    ]);
  };

  // payments

  getPayments(filter: Filter = null){
    // asocio 2 tablas y uso alias
    let sql = "SELECT p.id, p.data, p.id_class, p.paid FROM payment p, class c WHERE p.id_class = c.id"
    
    if(filter){

    }

    sql += " ORDER BY p.date";

    return this.db.executeSql(sql, []).then( response => {
      let payment = [];

      for(let i = 0; i< response.rows.length; i++){
        const row = response.rows.item(i);
        let p: Payment = row as Payment;
        payment.push(p);
        
      }

      return Promise.resolve(payment);
    }).catch(error => Promise.reject(error))
  }
}
