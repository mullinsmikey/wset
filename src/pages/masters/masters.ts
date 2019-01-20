import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Messages } from '../../providers';

@Component({
  selector: 'page-masters',
  templateUrl: 'masters.html'
})
export class MastersPage {
  // commands
  numCentr: string;
  numSlave: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public messages: Messages) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'masters' });
    helpModal.present();
  }

  setCentr() { this.messages.send('center,' + this.numCentr, 'Админ 1 отправлен\nОжидайте ответа'); }
  setSlave() { this.messages.send('slave,' + this.numSlave, 'Админ 2 отправлен\nОжидайте ответа'); }

}
