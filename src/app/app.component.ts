import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqliteManagerService } from './services/sqlite-manager.service';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx/index';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  load: boolean;

  constructor(
              private slqliteManager: SqliteManagerService,
              private platform: Platform,
              private globalization: Globalization,
              private translate : TranslateService) {

                this.load = false;
                this.translate.setDefaultLang('es');
                this.iniciarApp();

              }

  iniciarApp(){

    const self = this;
    this.platform.ready().then(()=>{

      this.globalization.getPreferredLanguage().then(res => {
        

        if(res){
          if(res.value.includes('-')){
            this.translate.use(res.value.split('-')[0]);
          }else{
            this.translate.use(res.value)
          }
        }
      }).catch(e => console.log(e));


      this.slqliteManager.createDateBase().then(()=>{
        // usamos self que reemplaza el this para este caso
        self.load = true
        console.log('base de datos cargada');
        
      }).catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}
