import { Component, OnInit } from '@angular/core';

import { LifecycleService, MessagesService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-factory',
    templateUrl: './factory.page.html',
    styleUrls: ['./factory.page.scss']
})
export class FactoryPage implements OnInit {

    // noinspection JSUnusedGlobalSymbols
    constructor(
        public navigation: NavigationService,
        public lifecycle: LifecycleService,
        public sharedNative: SharedNativeService,
        private messages: MessagesService
    ) {
    }

    // noinspection JSUnusedGlobalSymbols
    initDone = false;

    // DOM interaction
    // ---------------------------------------------------

    async exec() {
        await this.messages.fnSendPlain('factory');
    }

    // Data processing
    // ---------------------------------------------------

    async loadPage() {
    }

    // Lifecycle
    // ---------------------------------------------------

    async ngOnInit() {
        await this.lifecycle.init(this);
    }

}
