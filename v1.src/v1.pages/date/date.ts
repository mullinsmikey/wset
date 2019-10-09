import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Messages } from '../../providers';

@Component({
  selector: 'page-date',
  templateUrl: 'date.html'
})
export class DatePage {
  // commands
  setLang: string = "9";
  setZone: string = "4";

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public messages: Messages) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'date' });
    helpModal.present();
  }

  setLz() { this.messages.send('lz,' + this.setLang + ',' + this.setZone, 'Настройки отправлены\nОжидайте ответа'); }
  setCali() { this.messages.send('timecali', 'Команда отправлена\nОжидайте калибровки'); }

}
