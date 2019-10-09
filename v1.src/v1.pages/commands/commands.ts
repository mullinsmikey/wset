import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';
import { Messages } from '../../providers';

@Component({
  selector: 'page-commands',
  templateUrl: 'commands.html'
})
export class CommandsPage {
  // settings
  exMode: boolean;
  // commands
  uploadSec: number = 15;
  moniTo: string = '8';
  callTo: string = '8';

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private storage: Storage,
    public messages: Messages
  ) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'commands' });
    helpModal.present();
  }

  // PROCESSING BUTTONS (COMMANDS)
  sendTs() { this.messages.send('ts', 'Запрос отправлен\nОжидайте ответа'); }
  sendTt() { this.messages.send('tt', 'Запрос отправлен\nОжидайте ответа'); }
  sendLo() { this.messages.send('url', 'Запрос отправлен\nОжидайте геопозицию'); }
  sendFi() { this.messages.send('find', 'Запрос отправлен\nОжидайте звука'); }
  sendPo() { this.messages.send('poweroff', 'Выключение\nОжидайте'); }
  sendRe() { this.messages.send('reset', 'Перезапуск\nОжидайте'); }
  sendSeEu() { this.messages.send('ip,52.28.132.157,8001', 'Сервер установлен (Se Европа)\nОжидайте "ip ok"'); }
  moniMake() { this.messages.send('monitor,' + this.moniTo, 'Запрос отправлен\nОжидайте звонка'); }
  callMake() { this.messages.send('monitor,' + this.callTo, 'Запрос отправлен\nОжидайте звонка'); }
  setUpload() { this.messages.send('upload,' + this.uploadSec * 60, 'Интервал установлен\nОжидайте ответа'); }

  // LOAD-RELOAD SETTINGS WHEN OPENING PAGE
  ionViewDidEnter() {
    this.storage.get('exMode').then((val) => {
      if (val == null) { this.exMode = false; } else { this.exMode = val; }
    }).catch(err => console.log(err));
  }

}
