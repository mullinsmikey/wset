import { Component, OnInit } from '@angular/core';
import * as _const from '@modules/constants';

import { Storage } from '@ionic/storage';

import { EmService, LifecycleService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {

    // noinspection JSUnusedGlobalSymbols
    constructor(
        public navigation: NavigationService,
        public lifecycle: LifecycleService,
        public sharedNative: SharedNativeService,
        private storage: Storage,
        public em: EmService
    ) {
    }

    // noinspection JSUnusedGlobalSymbols
    initDone = false;

    appVersionNumber = _const.APP_VERSION;

    // DOM interaction
    // ---------------------------------------------------

    openLink(url: string) {
        window.open(url, '_system', 'location=yes');
    }

    async toggleMode() {
        await this.storage.set(_const.EXTENDED_MODE, this.em.extendedMode);
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
