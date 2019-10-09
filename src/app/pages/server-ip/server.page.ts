import { Component, OnInit } from '@angular/core';
import * as _const from '@modules/constants';

import { LifecycleService, MessagesService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-server',
    templateUrl: './server.page.html',
    styleUrls: ['./server.page.scss']
})
export class ServerPage implements OnInit {

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

    serverTab = 'auto';

    serverOps = _const.SERVER_OPS;

    manIp = '';
    manPort = '';

    // DOM interaction
    // ---------------------------------------------------

    async exec(id: string) {
        await this.messages.fnSendIp(_const.SERVER_CONFIGS[id].ip, _const.SERVER_CONFIGS[id].port);
    }

    async sendManual() {
        await this.messages.fnSendIp(this.manIp, this.manPort);
    }

    segmentChanged(ev: any) {
        this.serverTab = ev.detail.value;
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
