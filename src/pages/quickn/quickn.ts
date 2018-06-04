import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-quickn',
  templateUrl: 'quickn.html',
  providers: [ ToastController, ModalController, SMS ]
})
export class QuicknPage {
  // VARIABLES
  // settings
  usePw: string;
  simSend: string;
  spStatus: boolean;
  // commands
  quickn1: string;
  quickn2: string;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController, public modalCtrl: ModalController,
    private storage: Storage, private sms: SMS) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'quickn' });
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

  setQuickn1() { this.sendSms('tel1,' + this.quickn1, 'Номер 1 отправлен\nОжидайте ответа'); }
  setQuickn2() { this.sendSms('tel2,' + this.quickn1, 'Номер 2 отправлен\nОжидайте ответа'); }

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
