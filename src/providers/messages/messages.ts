import 'rxjs/add/operator/toPromise';

import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';
import { Security } from '../';

import { Injectable } from '@angular/core';

@Injectable()
export class Messages {

  constructor(
    private storage: Storage,
    public toastCtrl: ToastController,
    private security: Security,
    public sms: SMS) { }

  send(cmd: string, toast: string) {
    let gn, gp, cmdStr: string;
    this.getPerms().then(isau => {
      if (isau) {
        this.getNumber().then(valgn => {
          this.security.check(valgn).then(clngn => {
            if (clngn != 'ERROR') {
              gn = clngn;
              this.getPass().then(valgp => {
                gp = valgp;
                cmdStr = 'pw,' + gp + ',' + cmd + '#';
                this.sms.send(gn, cmdStr).catch(err => console.log(err));
                this.showToast(toast);
              });
            } else {
              this.showToast('Неверно введен номер!');
            }
          });
        });
      } else {
        this.showToast('Недостаточно разрешений!');
      }
    });
    return;
  }
  getPerms() : any {
    return new Promise((resolve) => {
      let ssms, rpst: boolean;
      this.storage.get('perm_ssms').then((val) => {
        ssms = val;
        this.storage.get('perm_rpst').then((val) => {
          rpst = val;
          if (ssms && rpst) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    });
  }
  getNumber() : any {
    return new Promise((resolve) => {
      this.storage.get('useTest').then((uts) => {
        if (uts) {
          this.storage.get('simTest').then((val) => { resolve(val); }).catch(err => console.log(err));
        } else {
          this.storage.get('simClient').then((val) => { resolve(val); }).catch(err => console.log(err));
        }
      }).catch(err => console.log(err));
    });
  }
  getPass() : any {
    return new Promise((resolve) => {
      this.storage.get('useStdPw').then((usp) => {
        if (usp) {
          resolve('123456');
        } else {
          resolve('523681');
        }
      }).catch(err => console.log(err));
    });
  }
  showToast(tText: string) {
    let toast = this.toastCtrl.create({
      message: tText,
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'OK',
      dismissOnPageChange: true
    });
    toast.present();
  }

}
