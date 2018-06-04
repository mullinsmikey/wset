import { Component } from '@angular/core';
import { Platform, NavController, ModalController, AlertController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
  providers: [ ModalController ]
})
export class SetupPage {
  // VARIABLES
  spPone: boolean;
  simTest: string;
  simClient: string;
  useTest: boolean;
  useStdPw: boolean;
  exMode: boolean;
  tSimHead: string;
  tSimField: string;

  // CONSTRUCTOR
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    public platform: Platform,
    private storage: Storage) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'setup' });
    helpModal.present();
  }

  // CHECK-REQUEST SMS PERMISSION
  checkSms() {
    this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.SEND_SMS).then((status) => {
      if (status == this.diagnostic.permissionStatus.GRANTED) {
        this.storage.set('spStatus', true); this.storage.set('spPone', false);
      } else {
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
                        subTitle: 'Приложение будет закрыто для принятия изменений',
                        buttons: [{
                          text: 'OK',
                          handler: () => { this.platform.exitApp(); }
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
                      handler: () => { this.platform.exitApp(); }
                    }]
                  }); alert.present();
                }
              }
            }
          ]
        }); alert.present();
      }
    }, (err) => { console.log(err); });
}

  // SAVE SETTINGS WHEN CLOSING PAGE
  ionViewWillLeave() {
    this.storage.set('simTest', this.simTest);
    this.storage.set('simClient', this.simClient);
    this.storage.set('useTest', this.useTest);
    this.storage.set('useStdPw', this.useStdPw);
  }

  // LOAD-RELOAD SETTINGS WHEN OPENING PAGE
  ionViewDidLoad() {
    this.storage.get('spPone').then((val) => {
      if (val == null) { this.spPone = true; } else { this.spPone = val; }
    }).catch(err => console.log(err));
    this.storage.get('simTest').then((val) => {
      this.simTest = val;
    }).catch(err => console.log(err));
    this.storage.get('simClient').then((val) => {
      this.simClient = val;
    }).catch(err => console.log(err));
    this.storage.get('useTest').then((val) => {
      if (val == null) { this.useTest = true; } else { this.useTest = val; }
    }).catch(err => console.log(err));
    this.storage.get('useStdPw').then((val) => {
      if (val == null) { this.useStdPw = true; } else { this.useStdPw = val; }
    }).catch(err => console.log(err));
    this.storage.get('exMode').then((val) => {
      if (val == null) { this.exMode = false; } else { this.exMode = val; }
      if (this.exMode == true) {
        this.tSimHead = 'Номер тестовой SIM-карты';
        this.tSimField = 'Тестовая SIM';
      } else {
        this.tSimHead = 'SIM-карта в часах';
        this.tSimField = 'Номер SIM';
        this.useTest = true;
      }
    }).catch(err => console.log(err));
  }

}
