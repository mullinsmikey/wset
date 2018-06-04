import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-date',
  templateUrl: 'date.html',
  providers: [ ToastController, ModalController, SMS ]
})
export class DatePage {
  // VARIABLES
  // settings
  usePw: string;
  simSend: string;
  spStatus: boolean;
  // commands
  setLang: string = "9";
  setZone: string = "4";

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController, public modalCtrl: ModalController,
    private storage: Storage, private sms: SMS) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'date' });
    helpModal.present();
  }
  presentToast(tText: string) {
    let toast = this.toastCtrl.create({
      message: tText,
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'OK',
      dismissOnPageChange: true
    });
    toast.present();
  }
  sendSms(cmd: string, toast: string) {
    if ((this.spStatus) && (this.simSend != null) && (this.simSend != '')) {
      let sendTo = this.simSend;
      let cmdStr = 'pw,' + this.usePw + ',' + cmd + '#';
      this.sms.send(sendTo, cmdStr).catch(err => console.log(err));
      this.presentToast(toast);
    } else if (!this.spStatus) {
      this.presentToast('Нет доступа к отправке SMS\nРазрешите на вкладке Настройки');
    } else {
      this.presentToast('Неверно указан номер SIM\nИзмените на вкладке Настройки');
    }
  }

  setLz() { this.sendSms('lz,' + this.setLang + ',' + this.setZone, 'Настройки отправлены\nОжидайте ответа'); }
  setCali() { this.sendSms('timecali', 'Команда отправлена\nОжидайте калибровки'); }

  // LOAD-RELOAD SETTINGS WHEN OPENING PAGE
  ionViewDidEnter() {
    this.storage.get('useTest').then((val) => {
      let useTest = val;
      if (useTest == true) {
        this.storage.get('simTest').then((val) => { this.simSend = val; }).catch(err => console.log(err));
      } else {
        this.storage.get('simClient').then((val) => { this.simSend = val; }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
    this.storage.get('useStdPw').then((val) => {
      let useStdPw = val;
      if (useStdPw == true) {
        this.usePw = '123456';
      } else {
        this.usePw = '523681';
      }
    }).catch(err => console.log(err));
    this.storage.get('spStatus').then((val) => {
      if (val == null) { this.spStatus = false; } else { this.spStatus = val; }
    }).catch(err => console.log(err));
  }

}
