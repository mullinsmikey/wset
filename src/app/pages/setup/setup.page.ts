import { Component, OnInit } from '@angular/core';
import * as _const from '@modules/constants';

import { CacheService, EmService, LifecycleService, NavigationService, SharedNativeService } from '@app/services';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.page.html',
    styleUrls: ['./setup.page.scss']
})
export class SetupPage implements OnInit {

    // noinspection JSUnusedGlobalSymbols
    constructor(
        public navigation: NavigationService,
        public lifecycle: LifecycleService,
        public sharedNative: SharedNativeService,
        public cacheSvc: CacheService,
        private storage: Storage,
        public em: EmService
    ) {
    }

    // noinspection JSUnusedGlobalSymbols
    initDone = false;

    number1 = '';
    number2 = '';
    usePrimary = true;
    password = '';
    useStandPw = true;

    // DOM interaction
    // ---------------------------------------------------

    // Data processing
    // ---------------------------------------------------

    async loadPage() {
        this.number1 = await this.cacheSvc.configGet(_const.NUM_1, '+7');
        this.number2 = await this.cacheSvc.configGet(_const.NUM_2, '+7');
        this.usePrimary = await this.cacheSvc.configGet(_const.NUM_USE1, true);
        this.password = await this.cacheSvc.configGet(_const.PW_USER, '');
        this.useStandPw = await this.cacheSvc.configGet(_const.PW_STANDARD, true);
    }

    // Lifecycle
    // ---------------------------------------------------

    // noinspection JSUnusedGlobalSymbols
    async ionViewWillLeave() {
        await Promise.all([
            this.storage.set(_const.NUM_1, this.number1),
            this.storage.set(_const.NUM_2, this.number2),
            this.storage.set(_const.NUM_USE1, this.usePrimary),
            this.storage.set(_const.PW_USER, this.password),
            this.storage.set(_const.PW_STANDARD, this.useStandPw)
        ]);
    }

    async ngOnInit() {
        await this.lifecycle.init(this);
    }

}
