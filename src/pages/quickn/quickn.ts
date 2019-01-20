import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Messages } from '../../providers';

@Component({
  selector: 'page-quickn',
  templateUrl: 'quickn.html'
})
export class QuicknPage {
  // commands
  quickn1: string;
  quickn2: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public messages: Messages) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'quickn' });
    helpModal.present();
  }

  setQuickn1() { this.messages.send('tel1,' + this.quickn1, 'Номер 1 отправлен\nОжидайте ответа'); }
  setQuickn2() { this.messages.send('tel2,' + this.quickn1, 'Номер 2 отправлен\nОжидайте ответа'); }

}
