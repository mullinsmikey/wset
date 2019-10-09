import { Injectable } from '@angular/core';

import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class SharedNativeService {

    constructor(
        // public alertController: AlertController,
        public loadingController: LoadingController,
        public toastController: ToastController
    ) {
    }

    // Alert
    // ---------------------------------------------------

    // public async alertVisitCart() {
    //     const alert = await this.alertController.create({
    //         header: 'Товар в корзине!',
    //         // message: '',
    //         buttons: [
    //             {
    //                 text: 'Продолжить покупки',
    //                 role: 'cancel',
    //                 // cssClass: 'secondary',
    //                 // handler: () => {}
    //             },
    //             {
    //                 text: 'Перейти в корзину',
    //                 handler: () => {
    //                     this.navigation.forwardNoTab('cart');
    //                 }
    //             }
    //         ]
    //     });
    //
    //     await alert.present();
    // }

    // Loading
    // ---------------------------------------------------

    public async showLoading(message: string = '') {
        const loading = await this.loadingController.create({
            showBackdrop: false,
            spinner: 'crescent',
            message
        });
        await loading.present();
        return;
    }

    public async hideLoading() {
        return await this.loadingController.dismiss();
    }

    // Toast
    // ---------------------------------------------------

    public async showToast(text: string, light: boolean = true): Promise<void> {
        const toast = await this.toastController.create({
            color: light ? 'light' : 'dark',
            duration: 2000,
            message: text,
            showCloseButton: true,
            closeButtonText: 'OK',
            position: 'top',
            translucent: light
        });
        toast.present();
        return;
    }

    // API error handler
    // ---------------------------------------------------

    public handleApiError(errorMsg: string | any): Promise<void> {
        if (errorMsg.includes('INCORRECT_PASSWORD')) {
            errorMsg = 'Неверный пароль';
        } else if (errorMsg.includes('java.net.UnknownHostException: Unable to resolve host')) {
            errorMsg = 'Нет доступа к сети';
        }

        return this.showToast(errorMsg, false);
    }

}
