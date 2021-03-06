import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApnPage } from '../apn/apn';
import { DatePage } from '../date/date';
import { MastersPage } from '../masters/masters';
import { SosnPage } from '../sosn/sosn';
import { QuicknPage } from '../quickn/quickn';
import { ListenPage } from '../listen/listen';
import { SettingsPage } from '../settings/settings';
import { ContactsPage } from '../contacts/contacts';
import { HelpfullPage } from '../helpfull/helpfull';
import { FactoryPage } from '../factory/factory';
import { InfoPage } from '../info/info';

@Component({
  selector: 'page-extra',
  templateUrl: 'extra.html'
})
export class ExtraPage {
  // VARIABLES
  exMode: boolean;
  items = [];

  // CONSTRUCTOR
  constructor(public navCtrl: NavController,
    private storage: Storage) {}

  // REUSABLE FUNCTIONS
  openPage(item) {
    this.navCtrl.push(item.component);
  }

  // LOAD-RELOAD SETTINGS WHEN OPENING PAGE
  ionViewDidLoad() {
    this.storage.get('exMode').then((val) => {
      if (val == null) { this.exMode = false; } else { this.exMode = val; }
      if (this.exMode) {
        this.items = [
          { title: 'APN и сервер', component: ApnPage, icon: 'globe'},
          { title: 'Язык, дата и время', component: DatePage, icon: 'time'},
          { title: 'Админ номера', component: MastersPage, icon: 'contact'},
          { title: 'SOS-номера', component: SosnPage, icon: 'help-buoy'},
          { title: 'Быстрые номера', component: QuicknPage, icon: 'switch'},
          { title: 'Прослушка', component: ListenPage, icon: 'call'},
          { title: 'Настройки часов', component: SettingsPage, icon: 'cog'},
          { title: 'Контакты (1 – 5)', component: ContactsPage, icon: 'contacts'},
          { title: 'Справка', component: HelpfullPage, icon: 'help-circle'},
          { title: 'Сброс настроек', component: FactoryPage, icon: 'trash'},
          { title: 'О приложении', component: InfoPage, icon: 'information-circle'}
        ];
      } else {
        this.items = [
          { title: 'Справка', component: HelpfullPage, icon: 'help-circle'},
          { title: 'О приложении', component: InfoPage, icon: 'information-circle'}
        ];
      }
    }).catch(err => console.log(err));
  }

}
