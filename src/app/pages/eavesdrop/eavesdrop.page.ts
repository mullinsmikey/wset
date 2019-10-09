import { Component, OnInit } from '@angular/core';

import { LifecycleService, MessagesService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-eavesdrop',
    templateUrl: './eavesdrop.page.html',
    styleUrls: ['./eavesdrop.page.scss']
})
export class EavesdropPage implements OnInit {

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

    numPlainCall = '8';
    numEavesdrop = '8';

    // DOM interaction
    // ---------------------------------------------------

    async sendPlainCall() {
        await this.messages.fnSendParam('monitor', this.numPlainCall);
    }

    async sendEavesdrop() {
        await this.messages.fnSendParam('monitor', this.numEavesdrop);
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
