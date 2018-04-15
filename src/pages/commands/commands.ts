import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-commands',
  templateUrl: 'commands.html',
  providers: [ ToastController, ModalController, SMS ]
})
export class CommandsPage {
  usePw: string;
  simSend: string;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController, public modalCtrl: ModalController,
    private storage: Storage, private sms: SMS) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'commands' });
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

  // PROCESSING BUTTONS (COMMANDS)
  sendTs() { this.sendSms('ts', 'Запрос отправлен\nОжидайте ответа'); }
  sendTt() { this.sendSms('tt', 'Запрос отправлен\nОжидайте ответа'); }
  sendLo() { this.sendSms('url', 'Запрос отправлен\nОжидайте геопозицию'); }
  sendFi() { this.sendSms('find', 'Запрос отправлен\nОжидайте звука'); }
  sendPo() { this.sendSms('poweroff', 'Выключение\nОжидайте'); }
  sendRe() { this.sendSms('reset', 'Перезапуск\nОжидайте'); }

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
  }

}
