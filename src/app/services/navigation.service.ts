import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { LoadingController, NavController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(
        private router: Router,
        public navController: NavController,
        private loadingController: LoadingController
    ) {
    }

    public forwardNoTab(pathTo: string) {
        // noinspection JSIgnoredPromiseFromCall
        this.navController.navigateForward([pathTo]);
    }

    public forward(path: string | UrlTree) { // ,options?: NavigationOptions
        // options = options === undefined ? { animated: undefined, animationDirection: undefined } : options;

        // this.navController.setDirection('forward', options.animated, options.animationDirection);
        this.navController.setDirection('forward', undefined, undefined);

        // return this.router.navigateByUrl('/tabs' + path, {});
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl('/tabs' + path, {});
    }


    public forwardSilentNoTab(pathTo: string) {
        // noinspection JSIgnoredPromiseFromCall
        this.navController.navigateForward([pathTo], { skipLocationChange: true });
    }

    public forwardSilent(path: string | UrlTree) { // ,options?: NavigationOptions
        // options = options === undefined ? { animated: undefined, animationDirection: undefined } : options;
        // options.skipLocationChange = true;

        // this.navController.setDirection('forward', options.animated, options.animationDirection);
        this.navController.setDirection('forward', undefined, undefined);

        // return this.router.navigateByUrl('/tabs' + path, { skipLocationChange: true });
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl('/tabs' + path, { skipLocationChange: true });
    }


    public back() {
        this.hideLoadingIfPresent().then(() => {
            this.navController.back();
        });
    }


    public rootNoTab(pathTo: string) {
        // noinspection JSIgnoredPromiseFromCall
        this.navController.navigateRoot([pathTo]);
    }

    public root(path: string | UrlTree) { // ,options?: NavigationOptions
        // options = options === undefined ? { animated: undefined, animationDirection: undefined } : options;

        // this.navController.setDirection('root', options.animated, options.animationDirection);
        this.navController.setDirection('root', undefined, undefined);

        // return this.router.navigateByUrl('/tabs' + path, {});
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl('/tabs' + path, {});
    }


    private async hideLoadingIfPresent() {
        const loading = await this.loadingController.getTop();
        if (loading) {
            await this.loadingController.dismiss();
        }
        return;
    }

}
