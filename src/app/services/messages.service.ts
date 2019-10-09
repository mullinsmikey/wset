import { Injectable } from '@angular/core';
import * as _const from '@modules/constants';

import { EmService } from '@app/services/em.service';
import { SMS } from '@ionic-native/sms/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    constructor(
        private sms: SMS,
        private storage: Storage,
        public em: EmService
    ) {
    }

    private androidOptions = {
        android: {
            intent: 'INTENT'  // send SMS with the native android SMS messaging
            // intent: '' // send SMS without opening any other app
        }
    };

    private async phoneResolver(): Promise<string> {
        if (this.em.extendedMode) {
            const use1 = await this.storage.get(_const.NUM_USE1);
            return use1
                ? await this.storage.get(_const.NUM_1)
                : await this.storage.get(_const.NUM_2);
        }
        return await this.storage.get(_const.NUM_1);
    }

    private async messageBuilder(msg: string): Promise<string> {
        const useStdPass = await this.storage.get(_const.PW_STANDARD);
        const passWd = useStdPass ? '123456' : await this.storage.get(_const.PW_USER);
        return 'pw,' + passWd + ',' + msg + '#';
    }

    //

    async fnSendPlain(command: string) {
        return await this.sms.send(
            await this.phoneResolver(),
            await this.messageBuilder(command),
            this.androidOptions
        );
    }

    async fnSendParam(command: string, param: string) {
        return await this.sms.send(
            await this.phoneResolver(),
            await this.messageBuilder(command + ',' + param),
            this.androidOptions
        );
    }

    async fnSendIp(server: string, port: string) {
        return await this.sms.send(
            await this.phoneResolver(),
            await this.messageBuilder('ip,' + server + ',' + port),
            this.androidOptions
        );
    }
}
