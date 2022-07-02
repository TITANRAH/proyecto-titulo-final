import { PopoverController } from '@ionic/angular';
import { Student } from './../../../models/student';
import { SqliteManagerService } from './../../../services/sqlite-manager.service';
import { Filter } from './../../../models/filter';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css']
})
export class FilterPageComponent implements OnInit {

  @Input() filter: Filter;
  @Input() payment: boolean;

  public students: Student[];

  constructor(
    private popoverController: PopoverController,
    private sqliteManager: SqliteManagerService
  ) {
    this.students = [];

  }

  ngOnInit() {

    if (this.filter.paid == null) {
      this.filter.paid = false;
    }

    // Obtener estudiantes
    this.sqliteManager.getStudents().then(students => {
      this.students = students;
    })

  }

  /**
   * Reseteamos las fechas si el pago no esta marcado
   */
  cleanDates() {
    if (!this.filter.paid) {
      this.filter.date_start = null;
      this.filter.date_end = null;
    }
  }

  /**
   * Cerramos el popover
   */
  filterData() {
    this.popoverController.dismiss(this.filter);
  }

  /**
   * Reset filtro
   */
  reset() {
    this.filter = new Filter();
    this.popoverController.dismiss(this.filter);
  }
}
