import { Component } from '@angular/core';
import { Platform, NavController, ModalController, AlertController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';
import { Contacts, Contact } from '@ionic-native/contacts';

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class SetupPage {
  // VARIABLES
  perm_ssms: boolean;
  perm_rpst: boolean;
  perm_pone: boolean;
  simTest: string;
  simClient: string;
  useTest: boolean;
  useStdPw: boolean;
  exMode: boolean;
  tSimHead: string;
  tSimField: string;

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public storage: Storage,
    private contacts: Contacts) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'setup' });
    helpModal.present();
  }

  // CHECK-REQUEST SMS PERMISSION
  checkSms() {
    this.navCtrl.push(WelcomePage, { slide: 'perms' });
  }

  getContact() {
    this.contacts.pickContact().then((response: Contact) => {
      this.simTest = response.phoneNumbers[0].value;
    });
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
    this.storage.get('perm_ssms').then(vssms => {
      this.perm_ssms = vssms;
      this.storage.get('perm_rpst').then(vrpst => {
        this.perm_rpst = vrpst;
        if ((!this.perm_ssms) || (!this.perm_rpst)) {
          this.perm_pone = true;
        }
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
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
    this.storage.get('exMode').then((val) => {
      if (val == null) { this.exMode = false; } else { this.exMode = val; }
      if (this.exMode == true) {
        this.tSimHead = 'Номер тестовой SIM-карты';
        this.tSimField = 'Тестовая SIM';
      } else {
        this.tSimHead = 'SIM-карта в часах';
        this.tSimField = 'Номер SIM';
        this.useTest = true;
      }
    }).catch(err => console.log(err));
  }

}
