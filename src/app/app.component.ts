import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { WelcomePage } from '../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class WSet {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private storage: Storage) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('welDone').then((val) => {
        if (val == true) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = WelcomePage;
        }
      }).catch(err => console.log(err));

      this.storage.get('perm_ssms').then((vssms) => {
        if (vssms == false) {
          this.storage.get('perm_rpst').then((vrpst) => {
            if (vrpst == false) {
              this.storage.set('perm_pone', true);
            }
          }).catch(err => console.log(err));
        } else {
          this.storage.get('perm_rpst').then((vrpst) => {
            if (vrpst == true) {
              this.storage.set('perm_pone', false);
            }
          }).catch(err => console.log(err));
        }
      }).catch(err => console.log(err));

    });
  }
}
