import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class WSet {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    private storage: Storage) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.SEND_SMS).then((status) => {
        if (status == this.diagnostic.permissionStatus.GRANTED) {
          this.storage.set('spStatus', true); this.storage.set('spPone', false);
        } else {
          this.storage.get('spPone').then((val) => {
            if ((val == null) || (val == false)) {
              const alert = this.alertCtrl.create({
                subTitle: 'Для корректной работы приложения необходимо разрешение на отправку SMS-сообщений',
                buttons: [
                  { text: 'Позже',
                    handler: () => { this.storage.set('spStatus', false); this.storage.set('spPone', true); }
                  },
                  { text: 'Разрешить',
                    handler: () => {
                      if (status != this.diagnostic.permissionStatus.DENIED_ALWAYS) {
                        this.diagnostic.requestRuntimePermission(this.diagnostic.permission.SEND_SMS).then((data) => {
                          if (data == this.diagnostic.permissionStatus.GRANTED) {
                            this.storage.set('spStatus', true); this.storage.set('spPone', false);
                            const alert = this.alertCtrl.create({
                              subTitle: 'Отлично! Приложение будет закрыто для принятия изменений.',
                              buttons: [{
                                text: 'OK',
                                handler: () => { platform.exitApp(); }
                              }]
                            }); alert.present();
                          } else {
                            this.storage.set('spStatus', false); this.storage.set('spPone', true);
                          }
                        });
                      } else {
                        const alert = this.alertCtrl.create({
                          subTitle: 'К сожалению, вы запретили приложению запрашивать доступ к отправке SMS. Пожалуйста, дайте доступ вручную через Настройки. Приложение будет закрыто в ожидании разрешения.',
                          buttons: [{
                            text: 'OK',
                            handler: () => { platform.exitApp(); }
                          }]
                        }); alert.present();
                      }
                    }
                  }
                ]
              }); alert.present();
            } else {
              this.storage.set('spStatus', false); this.storage.set('spPone', true);
            }
          }).catch(err => console.log(err));
        }
      }, (err) => { console.log(err); });

    });
  }
}
