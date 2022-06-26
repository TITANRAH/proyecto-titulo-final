
import { ComponentRef, Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController,
              private popovercontroller: PopoverController,
              private modalCtlr: ModalController,
              private translate: TranslateService) { }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      spinner: "bubbles",
      cssClass: 'normal',
      message,
      backdropDismiss: true
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }


  async presentAlertRemoveClass(header: string, message: string, functionOk){

    
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header,
      message,
      buttons: [
        {
          text: this.translate.instant('label.cancel'),
          role: 'cancel',           
          handler: () => {
                         
          }
        },
        {
          text: this.translate.instant('label.ok'),
          handler: () => {               
            functionOk();
          }
        }
      ]
    });
    await alert.present();
}

  presentAlert(header: string, message: string): Promise<boolean> {

    return new Promise( async (resolve) => {
        const alert = await this.alertController.create({
          cssClass: 'normal',
          header,
          message,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'normal',             
              handler: () => {
                
                resolve(false);
                return;
              }
            },
            {
              text: 'Ok',
              handler: () => {               
                
                resolve(true);
                return;
              }
            }
          ]
        });
        await alert.present();

    });

  }

  async presentToast(message: string, duration: number = 3000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position:'bottom',
      cssClass: 'normal',
    });
    await toast.present();
  }

  async presentToastT(message: string, duration: number = 3000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position:'top',
      cssClass: 'normal',
    });
    await toast.present();
  }

  async presentToastM(message: string, duration: number = 3000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position:'middle',
      cssClass: 'normal',
    });
    await toast.present();
  }

  async presentPopover(component: any, event: any, arg: any = {}) {
    const pop = await this.popovercontroller.create({
      component,
      event: event,
      mode: 'ios',
      cssClass: '',
      componentProps: arg,
      backdropDismiss: true
     
      
    });
    await pop.present();

  }

  async presentPopoverHeader(component: any, event?: any, arg: any = {}) {
    const pop = await this.popovercontroller.create({
      component,
      event: event,
      mode: 'ios',
      componentProps: arg,
      size: 'auto'
     
      
    });

      pop.onDidDismiss().then(event =>{
          console.log(event);
          
      });
    await pop.present();

  }

  async presentModal(component :any, arg :any = {}){
    const modal = await this.modalCtlr.create({
      component,
      cssClass: 'my-custom-class',
      componentProps: arg,
      backdropDismiss: true,
      
    });

    await modal.present();
  }

  async dismissModal() {
    
     this.modalCtlr.dismiss({
      'dismissed': true
      
    });
   
  }
}


