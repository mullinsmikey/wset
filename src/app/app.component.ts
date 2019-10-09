import { Component } from '@angular/core';
import * as _const from '@modules/constants';

import { Platform } from '@ionic/angular';

import { CacheService, EmService, NavigationService } from '@app/services';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import * as Sentry from 'sentry-cordova';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    constructor(
        private platform: Platform,
        public navigation: NavigationService,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private cacheSvc: CacheService,
        public em: EmService
        // private ngZone: NgZone
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready()
            .then(() => {

                // Colorizing Statusbar
                // ---------------------------------------------------
                // this.statusBar.styleLightContent();
                this.statusBar.styleDefault();

                if (cordova.platformId === 'android') {
                    // this.statusBar.backgroundColorByHexString('#ff0786e9');
                    this.statusBar.backgroundColorByHexString('#ffffffff');
                }

                // Checking if analytics enabled & initializing Sentry
                // ---------------------------------------------------
                // noinspection JSIgnoredPromiseFromCall
                // this.initAnalytics();

                // Catching hardware back button action
                // ---------------------------------------------------
                /*
                 * subscribeWithPriority(“@ionic/angular”: “4.0.0-rc.0”) fixes the strange behavior
                 * when combining software & hardware back buttons.
                 * Its current behaviour may vary with the consecutive versions.
                 * >> https://medium.com/@aleksandarmitrev/ionic-hardware-back-button-nightmare-9f4af35cbfb0
                 */
                this.platform.backButton.subscribeWithPriority(1, () => {
                    this.navigation.back();
                });

                // Clearing cached products
                // ---------------------------------------------------
                // noinspection JSIgnoredPromiseFromCall
                this.manageCache();

                // Finish loading
                // ---------------------------------------------------
                this.splashScreen.hide();
            });
    }

    // private async initAnalytics() {
    //     const isEnabled: boolean = await this.cacheSvc.fnIsAnalyticsEnabled();
    //     if (isEnabled) {
    //         // noinspection JSIgnoredPromiseFromCall
    //         this.cacheSvc.fnCheckFireTokenChange();
    //         Sentry.init({
    //             dsn: SENTRY_DSN,
    //             environment: environment.production ? 'production' : 'debug',
    //             release: environment.production ? 'sjmarket-app@' + APP_VERSION : 'sjmarket-app@debug'
    //         });
    //     }
    //     return;
    // }

    private async manageCache() {
        // await this.cacheSvc.fnInvalidateCaches();
        // await this.events.publish(EVENT_CART_UPDATE);
        this.em.extendedMode = await this.cacheSvc.configGet(_const.EXTENDED_MODE, false);
        return;
    }

}
