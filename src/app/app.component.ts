import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqliteManagerService } from './services/sqlite-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  load: boolean;

  constructor(
              private slqliteManager: SqliteManagerService,
              private platform: Platform) {

                this.load = false;
                this.iniciarApp();

              }

  iniciarApp(){

    const self = this;
    this.platform.ready().then(()=>{
      this.slqliteManager.createDateBase().then(()=>{
        // usamos self que reemplaza el this para este caso
        self.load = true
        console.log('base de datos cargada');
        
      }).catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}
