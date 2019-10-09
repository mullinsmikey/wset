import { Component, OnInit } from '@angular/core';
import * as _const from '@modules/constants';

import { LifecycleService, MessagesService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-time',
    templateUrl: './time.page.html',
    styleUrls: ['./time.page.scss']
})
export class TimePage implements OnInit {

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

    checkedLang = '9';
    checkedTime = '3';

    avLang = _const.LZ_LANGUAGES;
    avTime = _const.LZ_TIME_ZONES;

    // DOM interaction
    // ---------------------------------------------------

    async exec() {
        await this.messages.fnSendParam('lz',
            this.checkedLang + ',' + this.checkedTime);
    }

    async calibrate() {
        await this.messages.fnSendPlain('timecali');
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
