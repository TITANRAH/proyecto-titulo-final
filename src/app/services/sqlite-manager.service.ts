import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite/ngx';

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
      
      let sqlTablaClass = 'CREATE TABLE IF NOT EXISTS "class" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date_start` TEXT, `date_end` TEXT, `id_student` INTEGER NOT NULL, `price` REAL NOT NULL, FOREIGN KEY(`id_student`) REFERENCES `id_student`(`id`) );';
      
      let sqlDelClass = 'DELETE FROM class;';

      let sqlTablaPayment = 'CREATE TABLE IF NOT EXISTS "payment" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date` TEXT, `id_class` INTEGER NOT NULL, `paid` REAL DEFAULT 0, FOREIGN KEY(`id_class`) REFERENCES `class`(`id`) );';

      let sqlDelPay =' DELETE FROM payment;';

      return Promise.all([

        this.db.executeSql(sqlTablaAlumnos,[]),
        this.db.executeSql(sqlDelAlumnos,[]),
        this.db.executeSql(sqlTablaClass,[]),
        this.db.executeSql(sqlDelClass,[]),
        this.db.executeSql(sqlTablaPayment,[]),
        this.db.executeSql(sqlDelPay,[]), 
      ]).then(()=>{
        return true
      })

      

    })
      
  }
}
