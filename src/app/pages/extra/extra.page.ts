import { Component, OnInit } from '@angular/core';
import * as _const from '@modules/constants';

import { EmService, LifecycleService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-extra',
    templateUrl: './extra.page.html',
    styleUrls: ['./extra.page.scss']
})
export class ExtraPage implements OnInit {

    // noinspection JSUnusedGlobalSymbols
    constructor(
        public navigation: NavigationService,
        public lifecycle: LifecycleService,
        public sharedNative: SharedNativeService,
        public em: EmService
    ) {
    }

    // noinspection JSUnusedGlobalSymbols
    initDone = false;

    menuItems = _const.MENU_EXTRAS;

    // DOM interaction
    // ---------------------------------------------------

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
