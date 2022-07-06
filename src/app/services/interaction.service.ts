
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController,
              private popovercontroller: PopoverController,
              private modalCtlr: ModalController) { }

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

  async presentPopover(component: any, event?: any, arg: any = {}) {
    const pop = await this.popovercontroller.create({
      component,
      event: event,
      mode: 'ios',
      cssClass: 'custom-popover',
      componentProps: arg,
     
      
    });
    await pop.present();

  }

  async presentPopoverHeader(component: any, event?: any, arg: any = {}) {
    const pop = await this.popovercontroller.create({
      component,
      event: event,
      mode: 'ios',
      cssClass: 'popLogin',
      componentProps: arg,
     
      
    });
    await pop.present();

  }

  async presentModal(component :any, arg :any = {}){
    
    const modal = await this.modalCtlr.create({
      component,
      cssClass: 'my-custom-class',
      componentProps: arg,
      showBackdrop:true,
      backdropDismiss: true,
      mode:'ios'
    });

    await modal.present();
  }

  async dismissModal() {
    this.modalCtlr.dismiss({
      'dismissed': true
    });
  }
}


