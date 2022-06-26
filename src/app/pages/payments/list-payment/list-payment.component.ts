import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class';
import { Filter } from 'src/app/models/filter';
import { Payment } from 'src/app/models/payment';
import { Student } from 'src/app/models/students';
import { SqliteManagerService } from '../../../services/sqlite-manager.service';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss'],
})
export class ListPaymentComponent implements OnInit {

  payments: Payment[];
  classes: Class[];
  students: Student[];
  filter: Filter;
  total: number;

  constructor(private sqliteManagerService: SqliteManagerService) {
    this.payments = [];
    this.classes = [];
    this.students = [];
    this.total = 0;
    this.filter = new Filter();
   }

  ngOnInit() {

  }

  getPayments() {

    Promise.all([
      this.sqliteManagerService.getPayments(this.filter),
      this.sqliteManagerService.getClasses(),
      this.sqliteManagerService.getStudents()
    ]).then( results => {
      this.payments = results[0];
      this.classes = results[1];
      this.students = results[2];
      this.asosciateObjects();
      this.calculateTotal();
    });

  }

  calculateTotal(){
    let total = 0;

    this.payments.forEach(p => {
      total += p.class.price;
    })

    this.total = total;
  }

  asosciateObjects(){
    // primero recorro los pagos, busco su clase y cuando tenga la clase busco su estudiante
    this.payments.forEach(p => {
      p.class = this.classes.find( c => c.id == p.id_class);
      if(p.class){
        p.class.student = this.students.find(s => s.id === p.class.id_student)
      }
    })
  }

  filterData() {

  }

}
