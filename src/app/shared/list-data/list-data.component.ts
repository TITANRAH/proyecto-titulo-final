import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss'],
})
export class ListDataComponent implements OnInit {

  @Input() data: any[];
  @Input() emptyText: string;
  @Input() addText: string;
  @Input() showAdd = true;

  // el propio usuario que llame al componente pueda personalizar lo que quiera mostrar en cada fila
  @ContentChild("templateData", {static: false}) templateData: TemplateRef<any>;

  @Output() add: EventEmitter<boolean>;

  constructor() {

    this.add = new EventEmitter<boolean>()
   }

  ngOnInit() {}

  addData(){

    this.add.emit(true)
  }

}
