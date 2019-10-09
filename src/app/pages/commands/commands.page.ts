import { Component, OnInit } from '@angular/core';
import * as _const from '@modules/constants';

import {
    EmService,
    LifecycleService,
    MessagesService,
    NavigationService,
    SharedNativeService
} from '@app/services';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.page.html',
    styleUrls: ['./commands.page.scss']
})
export class CommandsPage implements OnInit {

    // noinspection JSUnusedGlobalSymbols
    constructor(
        public navigation: NavigationService,
        public lifecycle: LifecycleService,
        public sharedNative: SharedNativeService,
        private messages: MessagesService,
        public em: EmService
    ) {
    }

    // noinspection JSUnusedGlobalSymbols
    initDone = false;

    cmdSimple = _const.BUTTONS_SIMPLE;

    numPlainCall = '8';
    numEavesdrop = '8';
    uploadMin = '30';

    // DOM interaction
    // ---------------------------------------------------

    async exec(cmd: string) {
        await this.messages.fnSendPlain(cmd);
    }

    async sendPlainCall() {
        await this.messages.fnSendParam('monitor', this.numPlainCall);
    }

    async sendEavesdrop() {
        await this.messages.fnSendParam('monitor', this.numEavesdrop);
    }

    async sendUpload() {
        const upTime = parseFloat(this.uploadMin) * 60;
        await this.messages.fnSendParam('upload', upTime.toString());
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
