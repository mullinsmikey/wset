import { Component, OnInit } from '@angular/core';
import * as _const from '@modules/constants';

import { LifecycleService, MessagesService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-apn',
    templateUrl: './apn.page.html',
    styleUrls: ['./apn.page.scss']
})
export class ApnPage implements OnInit {

    // noinspection JSUnusedGlobalSymbols
    constructor(
        public navigation: NavigationService,
        public lifecycle: LifecycleService,
        public sharedNative: SharedNativeService,
        private messages: MessagesService
    ) {
    }

    // noinspection JSUnusedGlobalSymbols
    // initDone = false;

    apnTab = 'auto';

    mobileOps = _const.MOBILE_OPS;

    manApn = '';
    manLogin = '';
    manPass = '';

    // DOM interaction
    // ---------------------------------------------------

    async exec(id: string) {
        await this.messages.fnSendParam('apn', _const.APN_CONFIGS[id].conf);
    }

    async sendManual() {
        await this.messages.fnSendParam('apn',
            this.manApn + ',' + this.manLogin + ',' + this.manPass);
    }

    segmentChanged(ev: any) {
        this.apnTab = ev.detail.value;
    }

    // Data processing
    // ---------------------------------------------------

    // async loadPage() {
    // }

    // Lifecycle
    // ---------------------------------------------------

    async ngOnInit() {
        // await this.lifecycle.init(this);
    }

}
