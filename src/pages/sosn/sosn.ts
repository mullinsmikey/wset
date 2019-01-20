import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Messages } from '../../providers';

@Component({
  selector: 'page-sosn',
  templateUrl: 'sosn.html'
})
export class SosnPage {
  // commands
  sosn1: string;
  sosn2: string;
  sosn3: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public messages: Messages) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'sosn' });
    helpModal.present();
  }

  setSosn1() { this.messages.send('sos1,' + this.sosn1, 'SOS-1 отправлен\nОжидайте ответа'); }
  setSosn2() { this.messages.send('sos2,' + this.sosn2, 'SOS-2 отправлен\nОжидайте ответа'); }
  setSosn3() { this.messages.send('sos3,' + this.sosn3, 'SOS-3 отправлен\nОжидайте ответа'); }

}
