import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  // VARIABLES
  exMode: boolean;
  perm_ssms: boolean;
  perm_rpst: boolean;
  perm_rcns: boolean;
  info: boolean = false;

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private storage: Storage,
    public platform: Platform) {
      this.platform = platform;
    }

  // REUSABLE FUNCTIONS
  openWeb(url: string) {
    window.open(url, '_system', 'location=yes');
  }
  showInf(){
    this.info = !this.info;
  }
  changeMode() {
    this.storage.set('exMode', this.exMode);
    const alert = this.alertCtrl.create({
      subTitle: 'Приложение будет закрыто для принятия изменений',
      buttons: [{
        text: 'OK',
        handler: () => { this.platform.exitApp(); }
      }]
    });
    alert.present();
  }

  // SAVE SETTINGS WHEN CLOSING PAGE
  ionViewWillLeave() {
    this.storage.set('exMode', this.exMode);
  }

  // LOAD-RELOAD SETTINGS WHEN OPENING PAGE
  ionViewDidLoad() {
    this.storage.get('exMode').then((val) => {
      if (val == null) { this.exMode = false; } else { this.exMode = val; }
    }).catch(err => console.log(err));
    this.storage.get('perm_ssms').then((val) => {
      if (val == null) { this.perm_ssms = false; } else { this.perm_ssms = val; }
    }).catch(err => console.log(err));
    this.storage.get('perm_rpst').then((val) => {
      if (val == null) { this.perm_rpst = false; } else { this.perm_rpst = val; }
    }).catch(err => console.log(err));
    this.storage.get('perm_rcns').then((val) => {
      if (val == null) { this.perm_rcns = false; } else { this.perm_rcns = val; }
    }).catch(err => console.log(err));
  }

}
