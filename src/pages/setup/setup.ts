import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
  providers: [ ModalController ]
})
export class SetupPage {
  // VARIABLES
  simTest: string;
  simClient: string;
  useTest: boolean;
  useStdPw: boolean;

  // CONSTRUCTOR
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private storage: Storage) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'setup' });
    helpModal.present();
  }

  // SAVE SETTINGS WHEN CLOSING PAGE
  ionViewWillLeave() {
    this.storage.set('simTest', this.simTest);
    this.storage.set('simClient', this.simClient);
    this.storage.set('useTest', this.useTest);
    this.storage.set('useStdPw', this.useStdPw);
  }

  // LOAD-RELOAD SETTINGS WHEN OPENING PAGE
  ionViewDidLoad() {
    this.storage.get('simTest').then((val) => {
      this.simTest = val;
    }).catch(err => console.log(err));
    this.storage.get('simClient').then((val) => {
      this.simClient = val;
    }).catch(err => console.log(err));
    this.storage.get('useTest').then((val) => {
      if (val == null) { this.useTest = true; } else { this.useTest = val; }
    }).catch(err => console.log(err));
    this.storage.get('useStdPw').then((val) => {
      if (val == null) { this.useStdPw = true; } else { this.useStdPw = val; }
    }).catch(err => console.log(err));
  }

}
