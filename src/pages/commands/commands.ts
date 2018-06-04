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
  // VARIABLES
  // settings
  usePw: string;
  simSend: string;
  exMode: boolean;
  spStatus: boolean;
  // commands
  uploadSec: string;
  moniTo: string;
  callTo: string;

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

  // PROCESSING BUTTONS (COMMANDS)
  sendTs() { this.sendSms('ts', 'Запрос отправлен\nОжидайте ответа'); }
  sendTt() { this.sendSms('tt', 'Запрос отправлен\nОжидайте ответа'); }
  sendLo() { this.sendSms('url', 'Запрос отправлен\nОжидайте геопозицию'); }
  sendFi() { this.sendSms('find', 'Запрос отправлен\nОжидайте звука'); }
  sendPo() { this.sendSms('poweroff', 'Выключение\nОжидайте'); }
  sendRe() { this.sendSms('reset', 'Перезапуск\nОжидайте'); }
  sendSeEu() { this.sendSms('ip,52.28.132.157,8001', 'Сервер установлен (Se Европа)\nОжидайте "ip ok"'); }
  moniMake() { this.sendSms('monitor,' + this.moniTo, 'Запрос отправлен\nОжидайте звонка'); }
  callMake() { this.sendSms('monitor,' + this.callTo, 'Запрос отправлен\nОжидайте звонка'); }
  setUpload() { this.sendSms('upload,' + this.uploadSec, 'Интервал установлен\nОжидайте ответа'); }

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
    this.storage.get('exMode').then((val) => {
      if (val == null) { this.exMode = false; } else { this.exMode = val; }
    }).catch(err => console.log(err));
    this.storage.get('spStatus').then((val) => {
      if (val == null) { this.spStatus = false; } else { this.spStatus = val; }
    }).catch(err => console.log(err));
  }

}
