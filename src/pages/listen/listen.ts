import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Messages } from '../../providers';

@Component({
  selector: 'page-listen',
  templateUrl: 'listen.html'
})
export class ListenPage {
  // commands
  moniTo: string;
  callTo: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public messages: Messages) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'listen' });
    helpModal.present();
  }

  moniMake() { this.messages.send('monitor,' + this.moniTo, 'Запрос отправлен\nОжидайте звонка'); }
  callMake() { this.messages.send('monitor,' + this.callTo, 'Запрос отправлен\nОжидайте звонка'); }

}
