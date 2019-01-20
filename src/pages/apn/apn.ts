import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Messages } from '../../providers';

@Component({
  selector: 'page-apn',
  templateUrl: 'apn.html'
})
export class ApnPage {
  // commands
  apnserv: string;
  apnMAddr: string;
  apnMLogin: string;
  apnMPass: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public messages: Messages) {
      this.apnserv = "apnauto";
    }

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'apn' });
    helpModal.present();
  }

  // PROCESSING BUTTONS (COMMANDS)
  sendMts1() { this.messages.send('apn,internet.mts.ru,mts,mts', 'APN отправлен (МТС)\nОжидайте ответа'); }
  sendMgf1() { this.messages.send('apn,internet,gdata,gdata', 'APN отправлен (Мегафон-1)\nОжидайте ответа'); }
  sendMgf2() { this.messages.send('apn,internet,,', 'APN отправлен (Мегафон-2)\nОжидайте ответа'); }
  sendMgf3() { this.messages.send('apn,internet.ltmsk,gdata,gdata', 'APN отправлен (Мегафон-3)\nОжидайте ответа'); }
  sendBln1() { this.messages.send('apn,internet.beeline.ru,beeline,beeline', 'APN отправлен (Билайн-1)\nОжидайте ответа'); }
  sendBln2() { this.messages.send('apn,home.beeline.ru,beeline,beeline', 'APN отправлен (Билайн-2)\nОжидайте ответа'); }
  sendTel1() { this.messages.send('apn,internet.tele2.ru,,', 'APN отправлен (Теле2)\nОжидайте ответа'); }
  sendMan() {
    let apnMan = 'apn,' + this.apnMAddr + ',' + this.apnMLogin + ',' + this.apnMPass;
    this.messages.send(apnMan, 'APN отправлен (вручную)\nОжидайте ответа');
  }
  sendSeEu() { this.messages.send('ip,52.28.132.157,8001', 'Сервер установлен (Se Европа)\nОжидайте "ip ok"'); }
  sendSeAs() { this.messages.send('ip,54.169.10.136,8001', 'Сервер установлен (Se Азия)\nОжидайте "ip ok"'); }
  sendSeNa() { this.messages.send('ip,54.153.6.9,8001', 'Сервер установлен (Se С.Америка)\nОжидайте "ip ok"'); }
  sendSeSa() { this.messages.send('ip,54.207.93.14,8001', 'Сервер установлен (Se Ю.Америка)\nОжидайте "ip ok"'); }
  sendSeHk() { this.messages.send('ip,58.96.181.173,8001', 'Сервер установлен (Se Гонконг)\nОжидайте "ip ok"'); }
  sendMaya() { this.messages.send('ip,im-ok.net,8001', 'Сервер установлен (Маяк)\nОжидайте "ip ok"'); }
  sendAsgr() { this.messages.send('ip,87.118.101.202,5565', 'Сервер установлен (Asgard)\nОжидайте "ip ok"'); }
  sendLgtr() { this.messages.send('ip,5.9.136.109,3359', 'Сервер установлен (LiveGPS)\nОжидайте "ip ok"'); }

}
