import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  constructor(public navCtrl: NavController) {}

  openWeb(url: string) {
    window.open(url, '_system', 'location=yes');
  }

}
