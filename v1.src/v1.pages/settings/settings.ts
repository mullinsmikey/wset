import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Messages } from '../../providers';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // commands
  uploadSec: number = 15;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public messages: Messages) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'settings' });
    helpModal.present();
  }

  setUpload() { this.messages.send('upload,' + this.uploadSec * 60, 'Интервал установлен\nОжидайте ответа'); }
  turnSosOn() { this.messages.send('sossms,1', 'SOS SMS включены\nОжидайте'); }
  turnSosOff() { this.messages.send('sossms,0', 'SOS SMS выключены\nОжидайте'); }
  // turnBigOn() { this.messages.send('bigtime,1', 'Установлен жирный шрифт\nОжидайте'); }
  // turnBigOff() { this.messages.send('bigtime,0', 'Установлен обычный шрифт\nОжидайте'); }
  turnTkOn() { this.messages.send('tkonoff,1', 'Голосовые включены\nОжидайте'); }
  turnTkOff() { this.messages.send('tkonoff,0', 'Голосовые выключены\nОжидайте'); }
  // turnBtOn() { this.messages.send('bt,1', 'Bluetooth включен\nОжидайте'); }
  // turnBtOff() { this.messages.send('bt,0', 'Bluetooth выключен\nОжидайте'); }
  turnPedOn() { this.messages.send('pedo,1', 'Шагомер включен\nОжидайте'); }
  turnPedOff() { this.messages.send('pedo,0', 'Шагомер выключен\nОжидайте'); }
  // turnFriOn() { this.messages.send('makefriend,1', 'Дружить включено\nОжидайте'); }
  // turnFriOff() { this.messages.send('makefriend,0', 'Дружить выключено\nОжидайте'); }
  // turnPhbOn() { this.messages.send('phbonoff,1', 'Список контактов включен\nОжидайте'); }
  // turnPhbOff() { this.messages.send('phbonoff,0', 'Список контактов выключен\nОжидайте'); }

}
