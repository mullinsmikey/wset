import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  showSlide = "hi";
  perm_ssms: boolean;
  perm_rpst: boolean;
  // perm_rcns: boolean;
  skip_ssms: boolean;
  skip_rpst: boolean;
  textSsms: string;
  textRpst: string;
  // textRcns: string;
  welDone: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    private storage: Storage
  ) {
      if (navParams.get('slide') != null) {
        this.showSlide = navParams.get('slide');
        if (this.showSlide == "perms") { this.goPerms(); }
      }
      this.storage.get('welDone').then((val) => {
        if (val == true) {
          this.welDone = val;
        } else { this.welDone = false; }
      }).catch(err => console.log(err));
    }

  startApp() {
    this.storage.set('welDone', true);
    this.navCtrl.setRoot(TabsPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }
  stopApp() {
    this.storage.set('welDone', true);
    this.storage.set('exMode', true);
    const alert = this.alertCtrl.create({
      subTitle: 'Приложение будет закрыто для принятия изменений',
      buttons: [{
        text: 'OK',
        handler: () => { this.platform.exitApp(); }
      }]
    });
    alert.present();
    // this.platform.exitApp();
  }

  goPerms() {
    this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.SEND_SMS).then((status) => {
      if (status == this.diagnostic.permissionStatus.GRANTED) {
        this.storage.set('perm_ssms', true); this.perm_ssms = true;
        this.textSsms = "Отлично!<br>Отправка SMS сообщений разрешена";
      } else {
        this.storage.set('perm_ssms', false); this.perm_ssms = false;
        this.textSsms = "WatchSet создан исключительно для Вашего удобства. Для корректной работы, пожалуйста, разрешите отправку SMS (только по Вашей команде)";
      }
    }).catch(err => console.log(err));
    this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.READ_PHONE_STATE).then((status) => {
      if (status == this.diagnostic.permissionStatus.GRANTED) {
        this.storage.set('perm_rpst', true); this.perm_rpst = true;
        this.textRpst = "Отлично!<br>Чтение состояния телефона разрешено";
      } else {
        this.storage.set('perm_rpst', false); this.perm_rpst = false;
        this.textRpst = "Для корректной работы на Android 8+ необходимо разрешение на 'чтение состояния телефона'";
      }
    }).catch(err => console.log(err));
    this.showSlide = "perms";
  }

  permitSms() {
    this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.SEND_SMS).then((status) => {

      if (status != this.diagnostic.permissionStatus.DENIED_ALWAYS) {
        this.diagnostic.requestRuntimePermission(this.diagnostic.permission.SEND_SMS).then((data) => {
          if (data == this.diagnostic.permissionStatus.GRANTED) {
            this.storage.set('perm_ssms', true); this.perm_ssms = true;
            this.textSsms = "Отлично!<br>Отправка SMS сообщений разрешена";
          } else {
            this.storage.set('perm_ssms', false); this.perm_ssms = false;
            this.textSsms = "WatchSet создан исключительно для Вашего удобства. Для корректной работы, пожалуйста, разрешите отправку SMS (только по Вашей команде)";
          }
          this.goPerms();
        }).catch(err => console.log(err));
      } else {
        const alert = this.alertCtrl.create({
          subTitle: 'К сожалению, вы запретили приложению запрашивать доступ к отправке SMS. Пожалуйста, разрешите доступ вручную через Настройки. Приложение будет закрыто в ожидании разрешения.',
          buttons: [{ text: 'OK', handler: () => { this.platform.exitApp(); }
          }]
        }); alert.present();
      }

    }).catch(err => console.log(err));
  }

  permitRps() {
    this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.READ_PHONE_STATE).then((status) => {

      if (status != this.diagnostic.permissionStatus.DENIED_ALWAYS) {
        this.diagnostic.requestRuntimePermission(this.diagnostic.permission.READ_PHONE_STATE).then((data) => {
          if (data == this.diagnostic.permissionStatus.GRANTED) {
            this.storage.set('perm_rpst', true); this.perm_rpst = true;
            this.textRpst = "Отлично!<br>Чтение состояния телефона разрешено";
          } else {
            this.storage.set('perm_rpst', false); this.perm_rpst = false;
            this.textRpst = "Для корректной работы на Android 8+ необходимо разрешение на 'чтение состояния телефона'";
          }
          this.goPerms();
        }).catch(err => console.log(err));
      } else {
        const alert = this.alertCtrl.create({
          subTitle: 'К сожалению, вы запретили приложению запрашивать доступ к состоянию телефона. Пожалуйста, разрешите доступ вручную через Настройки. Приложение будет закрыто в ожидании разрешения.',
          buttons: [{ text: 'OK', handler: () => { this.platform.exitApp(); }
          }]
        }); alert.present();
      }

    }).catch(err => console.log(err));
  }

  // permitRcs() {
  //   this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.READ_CONTACTS).then((status) => {
  //
  //     if (status != this.diagnostic.permissionStatus.DENIED_ALWAYS) {
  //       this.diagnostic.requestRuntimePermission(this.diagnostic.permission.READ_CONTACTS).then((data) => {
  //         if (data == this.diagnostic.permissionStatus.GRANTED) {
  //           this.perm_rcns = true;
  //           this.textRcns = "Отлично!<br>Чтение контактов разрешено";
  //         } else {
  //           this.perm_rcns = false;
  //           this.textRcns = "Вы можете указать номер часов из списка контактов, осталось разрешить WatchSet доступ к ним";
  //         }
  //         this.goPerms();
  //       }).catch(err => console.log(err));
  //     } else {
  //       const alert = this.alertCtrl.create({
  //         subTitle: 'К сожалению, вы запретили приложению запрашивать доступ к контактам. Пожалуйста, разрешите доступ вручную через Настройки. Приложение будет закрыто в ожидании разрешения.',
  //         buttons: [{ text: 'OK', handler: () => { this.platform.exitApp(); }
  //         }]
  //       }); alert.present();
  //     }
  //   }).catch(err => console.log(err));
  // }

  goDone() {
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
    this.showSlide = "done";
  }
  gpg(slide: string) {
    this.showSlide = slide;
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => { tabs[ key ].style.transform = 'translateY(56px)'; });
    }
  }

  ionViewDidLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => { tabs[ key ].style.transform = 'translateY(0)'; });
    }
  }


}
