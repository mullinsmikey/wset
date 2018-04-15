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
  usePw: string;
  simSend: string;
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
    let sendTo = this.simSend;
    let cmdStr = 'pw,' + this.usePw + ',' + cmd + '#';
    this.sms.send(sendTo, cmdStr).catch(err => console.log(err));
    this.presentToast(toast);
  }

  setQuickn1() { this.sendSms('tel1,' + this.quickn1, 'Номер 1 отправлен\nОжидайте ответа'); }
  setQuickn2() { this.sendSms('tel2,' + this.quickn1, 'Номер 2 отправлен\nОжидайте ответа'); }

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
