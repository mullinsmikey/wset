import { Component, OnInit } from '@angular/core';

import { LifecycleService, MessagesService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-quick',
    templateUrl: './quick.page.html',
    styleUrls: ['./quick.page.scss']
})
export class QuickPage implements OnInit {

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

    numQuick1 = '8';
    numQuick2 = '8';

    // DOM interaction
    // ---------------------------------------------------

    async sendQuick1() {
        await this.messages.fnSendParam('tel1', this.numQuick1);
    }

    async sendQuick2() {
        await this.messages.fnSendParam('tel2', this.numQuick2);
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
