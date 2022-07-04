import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  mail:any;
  password:any;

  init= false;

  constructor() {}

  verificacion(){
    if(this.mail != 'granrah1@gmail.com' && this.password != '123456'){
      
      
    }else{
     
     this.init= true;
    }
  }
  
}
