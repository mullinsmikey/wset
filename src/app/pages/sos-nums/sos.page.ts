import { Component, OnInit } from '@angular/core';

import { LifecycleService, MessagesService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-sos',
    templateUrl: './sos.page.html',
    styleUrls: ['./sos.page.scss']
})
export class SosPage implements OnInit {

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

    numSos1 = '8';
    numSos2 = '8';
    numSos3 = '8';

    // DOM interaction
    // ---------------------------------------------------

    async sendSos1() {
        await this.messages.fnSendParam('sos1', this.numSos1);
    }

    async sendSos2() {
        await this.messages.fnSendParam('sos2', this.numSos2);
    }

    async sendSos3() {
        await this.messages.fnSendParam('sos3', this.numSos3);
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
