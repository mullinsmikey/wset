import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
  providers: [ ToastController, ModalController, SMS ]
})
export class ContactsPage {
  // VARIABLES
  // settings
  usePw: string;
  simSend: string;
  spStatus: boolean;
  // commands
  cName1: string; cName2: string; cName3: string; cName4: string; cName5: string;
  cTel1: string; cTel2: string; cTel3: string; cTel4: string; cTel5: string;
  // encoding dictionary
  uniLL = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  uniLU = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  uniCL = ['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'];
  uniCU = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'];
  utfLL = ['0061','0062','0063','0064','0065','0066','0067','0068','0069','006A','006B','006C','006D','006E','006F','0070','0071','0072','0073','0074','0075','0076','0077','0078','0079','007A'];
  utfLU = ['0041','0042','0043','0044','0045','0046','0047','0048','0049','004A','004B','004C','004D','004E','004F','0050','0051','0052','0053','0054','0055','0056','0057','0058','0059','005A'];
  utfCL = ['0430','0431','0432','0433','0434','0435','0451','0436','0437','0438','0439','043A','043B','043C','043D','043E','043F','0440','0441','0442','0443','0444','0445','0446','0447','0448','0449','044A','044B','044C','044D','044E','044F'];
  utfCU = ['0410','0411','0412','0413','0414','0415','0401','0416','0417','0418','0419','041A','041B','041C','041D','041E','041F','0420','0421','0422','0423','0424','0425','0426','0427','0428','0429','042A','042B','042C','042D','042E','042F'];

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController, public modalCtrl: ModalController,
    private storage: Storage, private sms: SMS) {}

  // REUSABLE FUNCTIONS
  openHelp() {
    let helpModal = this.modalCtrl.create(HelpPage, { helpIs: 'contacts' });
    helpModal.present();
  }
  presentToast(tText: string) {
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
  sendSms(cmd: string, toast: string) {
    if ((this.spStatus) && (this.simSend != null) && (this.simSend != '')) {
      let sendTo = this.simSend;
      let cmdStr = 'pw,' + this.usePw + ',' + cmd + '#';
      this.sms.send(sendTo, cmdStr).catch(err => console.log(err));
      this.presentToast(toast);
    } else if (!this.spStatus) {
      this.presentToast('Нет доступа к отправке SMS\nРазрешите на вкладке Настройки');
    } else {
      this.presentToast('Неверно указан номер SIM\nИзмените на вкладке Настройки');
    }
  }

  utf16Enc(toEnc: string) {
    var ein = toEnc;
    for (var lu = 0; lu < this.uniLU.length; lu++) { ein = ein.replace(new RegExp(this.uniLU[lu], 'g'), this.utfLU[lu]); }
    for (var ll = 0; ll < this.uniLL.length; ll++) { ein = ein.replace(new RegExp(this.uniLL[ll], 'g'), this.utfLL[ll]); }
    for (var cu = 0; cu < this.uniCU.length; cu++) { ein = ein.replace(new RegExp(this.uniCU[cu], 'g'), this.utfCU[cu]); }
    for (var cl = 0; cl < this.uniCL.length; cl++) { ein = ein.replace(new RegExp(this.uniCL[cl], 'g'), this.utfCL[cl]); }
    return ein;
  }

  setCon1() {
    var con1 = ',,'; var con2 = ',,'; var con3 = ',,'; var con4 = ',,'; var con5 = ',';
    if ((this.cTel1 != null) && (this.cName1 != null)) {
      con1 = this.cTel1 + ',' + this.utf16Enc(this.cName1) + ',';
    }
    if ((this.cTel2 != null) && (this.cName2 != null)) {
      con2 = this.cTel2 + ',' + this.utf16Enc(this.cName2) + ',';
    }
    if ((this.cTel3 != null) && (this.cName3 != null)) {
      con3 = this.cTel3 + ',' + this.utf16Enc(this.cName3) + ',';
    }
    if ((this.cTel4 != null) && (this.cName4 != null)) {
      con4 = this.cTel4 + ',' + this.utf16Enc(this.cName4) + ',';
    }
    if ((this.cTel5 != null) && (this.cName5 != null)) {
      con5 = this.cTel5 + ',' + this.utf16Enc(this.cName5);
    }
    var conts = con1 + con2 + con3 + con4 + con5;
    this.sendSms('phb,' + conts, 'Номера отправлены\nОжидайте записи');
  }

  // LOAD-RELOAD SETTINGS WHEN OPENING PAGE
  ionViewDidEnter() {
    this.storage.get('useTest').then((val) => {
      let useTest = val;
      if (useTest == true) {
        this.storage.get('simTest').then((val) => { this.simSend = val; }).catch(err => console.log(err));
      } else {
        this.storage.get('simClient').then((val) => { this.simSend = val; }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
    this.storage.get('useStdPw').then((val) => {
      let useStdPw = val;
      if (useStdPw == true) {
        this.usePw = '123456';
      } else {
        this.usePw = '523681';
      }
    }).catch(err => console.log(err));
    this.storage.get('spStatus').then((val) => {
      if (val == null) { this.spStatus = false; } else { this.spStatus = val; }
    }).catch(err => console.log(err));
  }

}
