import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Messages } from '../../providers';

@Component({
  selector: 'page-factory',
  templateUrl: 'factory.html'
})
export class FactoryPage {

  constructor(
    public navCtrl: NavController,
    public messages: Messages) {}

  sendFr() { this.messages.send('factory', 'Часы будут сброшены\nОжидайте "factory ok, reset..."'); }

}
