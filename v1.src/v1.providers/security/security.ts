import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

@Injectable()
export class Security {

  constructor() { }


  check(phone: string) : any {
    return new Promise((resolve) => {
      if ((phone != null) && (phone != '') && (phone.charAt(0) == '+')) {
        resolve(phone);
        // this.clean(phone).then(clnum => {
        //   resolve(clnum);
        // });
      } else {
        resolve('ERROR');
      }
    });
  }

  // clean(num: string) : any {
  //   return new Promise((resolve) => {
  //     let clean = ['-',' ','(',')'];
  //     for (var e = 0; e < clean.length; e++) { num = num.replace(new RegExp(clean[e], 'g'), ''); }
  //     resolve(num);
  //   });
  // }

  /* class end */
}
