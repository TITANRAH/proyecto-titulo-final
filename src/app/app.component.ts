import { Globalization } from '@ionic-native/globalization/ngx';
import { SqliteManagerService } from './services/sqlite-manager.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  load: boolean;

  constructor(
    private platform: Platform,
    private sqliteManage: SqliteManagerService,
    private globalization: Globalization,
    private translate: TranslateService
  ) {
    this.load = false;
    this.translate.setDefaultLang('es');
    this.iniciarApp();
  }

  iniciarApp(){

    const self = this;
    this.platform.ready().then( () =>{

      this.globalization.getPreferredLanguage().then(res => {
        console.log(res);
        
        if(res){
          
          // Si contiene un - (es-ES), obtenemos la primera palabra
          if (res.value.includes('-')) {
            this.translate.use(res.value.split('-')[0]);
          } else {
            // Asiganmos el valor del idioma (es)
            this.translate.use(res.value);
          }

        }
      }).catch(e => console.error(e));

      this.sqliteManage.createDatabase().then( () => {
        self.load = true;
        console.log("Base de datos cargada");
      }).catch(e => console.error(e));

    }).catch(e => console.error(e));

  }
}
