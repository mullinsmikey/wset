import { Component, OnInit } from '@angular/core';

import { LifecycleService, NavigationService, SharedNativeService } from '@app/services';

@Component({
    selector: 'app-help',
    templateUrl: './help.page.html',
    styleUrls: ['./help.page.scss']
})
export class HelpPage implements OnInit {

    // noinspection JSUnusedGlobalSymbols
    constructor(
        public navigation: NavigationService,
        public lifecycle: LifecycleService,
        public sharedNative: SharedNativeService
    ) {
    }

    // noinspection JSUnusedGlobalSymbols
    // initDone = false;

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
