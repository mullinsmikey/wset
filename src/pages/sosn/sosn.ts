import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-sosn',
  templateUrl: 'sosn.html',
  providers: [ ToastController, ModalController, SMS ]
})
export class SosnPage {
  usePw: string;
  simSend: string;
  sosn1: string;
  sosn2: string;
  sosn3: string;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController, public modalCtrl: ModalController,
    private storage: Storage, private sms: SMS) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'sosn' });
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
    let sendTo = this.simSend;
    let cmdStr = 'pw,' + this.usePw + ',' + cmd + '#';
    this.sms.send(sendTo, cmdStr).catch(err => console.log(err));
    this.presentToast(toast);
  }

  setSosn1() { this.sendSms('sos1,' + this.sosn1, 'SOS-1 отправлен\nОжидайте ответа'); }
  setSosn2() { this.sendSms('sos2,' + this.sosn2, 'SOS-2 отправлен\nОжидайте ответа'); }
  setSosn3() { this.sendSms('sos3,' + this.sosn3, 'SOS-3 отправлен\nОжидайте ответа'); }

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
  }

}
