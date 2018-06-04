import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [ ToastController, ModalController, SMS ]
})
export class SettingsPage {
  // VARIABLES
  // settings
  usePw: string;
  simSend: string;
  spStatus: boolean;
  // commands
  uploadSec: string;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController, public modalCtrl: ModalController,
    private storage: Storage, private sms: SMS) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'settings' });
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

  setUpload() { this.sendSms('upload,' + this.uploadSec, 'Интервал установлен\nОжидайте ответа'); }
  turnSosOn() { this.sendSms('sossms,1', 'SOS SMS включены\nОжидайте'); }
  turnSosOff() { this.sendSms('sossms,0', 'SOS SMS выключены\nОжидайте'); }
  turnBigOn() { this.sendSms('bigtime,1', 'Установлен жирный шрифт\nОжидайте'); }
  turnBigOff() { this.sendSms('bigtime,0', 'Установлен обычный шрифт\nОжидайте'); }
  turnTkOn() { this.sendSms('tkonoff,1', 'Голосовые включены\nОжидайте'); }
  turnTkOff() { this.sendSms('tkonoff,0', 'Голосовые выключены\nОжидайте'); }
  turnBtOn() { this.sendSms('bt,1', 'Bluetooth включен\nОжидайте'); }
  turnBtOff() { this.sendSms('bt,0', 'Bluetooth выключен\nОжидайте'); }
  turnPedOn() { this.sendSms('pedo,1', 'Шагомер включен\nОжидайте'); }
  turnPedOff() { this.sendSms('pedo,0', 'Шагомер выключен\nОжидайте'); }
  turnFriOn() { this.sendSms('makefriend,1', 'Дружить включено\nОжидайте'); }
  turnFriOff() { this.sendSms('makefriend,0', 'Дружить выключено\nОжидайте'); }
  turnPhbOn() { this.sendSms('phbonoff,1', 'Список контактов включен\nОжидайте'); }
  turnPhbOff() { this.sendSms('phbonoff,0', 'Список контактов выключен\nОжидайте'); }


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
