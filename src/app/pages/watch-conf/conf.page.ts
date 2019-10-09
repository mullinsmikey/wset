import { Component, OnInit } from '@angular/core';

import { LifecycleService, MessagesService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-conf',
    templateUrl: './conf.page.html',
    styleUrls: ['./conf.page.scss']
})
export class ConfPage implements OnInit {

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

    uploadMin = '30';

    // DOM interaction
    // ---------------------------------------------------

    async sendUpload() {
        const upTime = parseFloat(this.uploadMin) * 60;
        await this.messages.fnSendParam('upload', upTime.toString());
    }

    async exec(cmd: string, param: string) {
        await this.messages.fnSendParam(cmd, param);
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
