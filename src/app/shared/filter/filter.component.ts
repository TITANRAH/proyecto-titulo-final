import { Filter } from './../../models/filter';
import { FilterPageComponent } from './filter-page/filter-page.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() filter: Filter;
  @Input() payment = false;

  public showFilters: boolean;

  @Output() filterData: EventEmitter<Filter>;

  constructor(
    public popoverController: PopoverController,
    
  ) {
    this.showFilters = false;
    this.filterData = new EventEmitter<Filter>();
  }

  /**
   * Creamos el popover
   * @param ev 
   */
   async createPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterPageComponent,
      backdropDismiss: true,
      event: ev,
      cssClass: '.popover-content',
      componentProps: {
        "filter": this.filter,
        "payment": this.payment
      }
    });

    // Evento al cerrar el popover
    popover.onDidDismiss().then(event => {
      console.log(event);
      this.showFilters = false;
      this.filterData.emit(event.data);
    })

    await popover.present();
  }

  

  ngOnInit() {

  }

  /**
   * Muestra/oculta el popover
   * @param $event 
   */
  showHideFilters($event) {
    this.showFilters = !this.showFilters;

    if (this.showFilters) {
      this.createPopover($event);
    }
  }

}
