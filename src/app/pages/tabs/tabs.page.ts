import { Component } from '@angular/core';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  mail:any;
  password:any;

  init= false;

  constructor(private interactionService: InteractionService) {}

  verificacion(){
    if(this.mail != 'granrah1@gmail.com' && this.password != '123456'){
      
      this.interactionService.presentAlert('Alerta', 'Usuario o contraseña no coinciden')
    }else{
     
     this.init= true;
     this.interactionService.presentToast('Bievenido profe !', 3000);
    }
  }

  mostrarPass(){

    let inputPass :any = document.getElementById('boton-password');
    inputPass.type === 'password' ? inputPass.type = 'text' : inputPass.type = 'password'
    
  }

  close(){
    this.init= false;
  }
  
}
