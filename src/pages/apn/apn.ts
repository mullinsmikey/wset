import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-apn',
  templateUrl: 'apn.html',
  providers: [ ToastController, ModalController, SMS ]
})
export class ApnPage {
  usePw: string;
  simSend: string;
  apnserv: string;
  apnMAddr: string;
  apnMLogin: string;
  apnMPass: string;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController, public modalCtrl: ModalController,
    private storage: Storage, private sms: SMS) {
      this.apnserv = "apnauto";
    }

  // REUSABLE FUNCTIONS
  openHelp() {
  let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'apn' });
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

  sendMts1() { this.sendSms('apn,internet.mts.ru,mts,mts', 'APN отправлен (МТС)\nОжидайте ответа'); }
  sendMgf1() { this.sendSms('apn,internet,gdata,gdata', 'APN отправлен (Мегафон-1)\nОжидайте ответа'); }
  sendMgf2() { this.sendSms('apn,internet,,', 'APN отправлен (Мегафон-2)\nОжидайте ответа'); }
  sendMgf3() { this.sendSms('apn,internet.ltmsk,gdata,gdata', 'APN отправлен (Мегафон-3)\nОжидайте ответа'); }
  sendBln1() { this.sendSms('apn,internet.beeline.ru,beeline,beeline', 'APN отправлен (Билайн-1)\nОжидайте ответа'); }
  sendBln2() { this.sendSms('apn,home.beeline.ru,beeline,beeline', 'APN отправлен (Билайн-2)\nОжидайте ответа'); }
  sendTel1() { this.sendSms('apn,internet.tele2.ru,,', 'APN отправлен (Теле2)\nОжидайте ответа'); }
  sendMan() {
    let apnMan = 'apn,' + this.apnMAddr + ',' + this.apnMLogin + ',' + this.apnMPass;
    this.sendSms(apnMan, 'APN отправлен (вручную)\nОжидайте ответа');
  }
  sendSeEu() { this.sendSms('ip,52.28.132.157,8001', 'Сервер установлен (Se Европа)\nОжидайте "ip ok"'); }
  sendSeAs() { this.sendSms('ip,54.169.10.136,8001', 'Сервер установлен (Se Азия)\nОжидайте "ip ok"'); }
  sendSeNa() { this.sendSms('ip,54.153.6.9,8001', 'Сервер установлен (Se С.Америка)\nОжидайте "ip ok"'); }
  sendSeSa() { this.sendSms('ip,54.207.93.14,8001', 'Сервер установлен (Se Ю.Америка)\nОжидайте "ip ok"'); }
  sendSeHk() { this.sendSms('ip,58.96.181.173,8001', 'Сервер установлен (Se Гонконг)\nОжидайте "ip ok"'); }
  sendMaya() { this.sendSms('ip,im-ok.net,8001', 'Сервер установлен (Маяк)\nОжидайте "ip ok"'); }
  sendAsgr() { this.sendSms('ip,87.118.101.202,5565', 'Сервер установлен (Asgard)\nОжидайте "ip ok"'); }
  sendLgtr() { this.sendSms('ip,5.9.136.109,3359', 'Сервер установлен (LiveGPS)\nОжидайте "ip ok"'); }

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
