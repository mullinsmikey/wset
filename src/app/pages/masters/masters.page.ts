import { Component, OnInit } from '@angular/core';

import { LifecycleService, MessagesService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-masters',
    templateUrl: './masters.page.html',
    styleUrls: ['./masters.page.scss']
})
export class MastersPage implements OnInit {

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

    numCenter = '8';
    numSlave = '8';

    // DOM interaction
    // ---------------------------------------------------

    async sendCenter() {
        await this.messages.fnSendParam('center', this.numCenter);
    }

    async sendSlave() {
        await this.messages.fnSendParam('slave', this.numSlave);
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
