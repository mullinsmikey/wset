import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LifecycleService {

    private static isIterable(value: any): boolean {
        if (value === null) { return false; }
        return (typeof value[Symbol.iterator] === 'function' || typeof value === 'object');
    }

    public static debugValue(value: any, comment: string = '') {
        comment += (comment === '') ? '' : ' :';
        const debType = ' <' + typeof value + '>: ';

        if (!LifecycleService.isIterable(value)) {
            console.log(comment + debType + value);
        }

        console.log(comment + debType);
        for (const debKey in value) {
            if (!value.hasOwnProperty(debKey)) { continue; }
            const keyType = ' <' + typeof debKey + '>: ';

            if (LifecycleService.isIterable(value[debKey])) {
                const valType = ' <' + typeof value[debKey] + '>';
                console.log(debKey + keyType + valType);
            } else {
                const valType = '\n...<' + typeof value[debKey] + '>: ';
                console.log(debKey + keyType + valType + value[debKey]);
            }
        }
    }

    // --------------------------------------------------

    /*
     * Basic page loading logic
     * @param scope          Pass `this` so page lifecycle can be managed from here
     * @param loadingMsg     A message to be shown with spinner
     */
    public async init(scope: any, loadingMsg: string = ''): Promise<void> {
        scope.initDone = false;
        await scope.sharedNative.showLoading(loadingMsg);
        await scope.loadPage();
        return await this.done(scope);
    }

    // noinspection JSMethodCanBeStatic
    public async done(scope: any): Promise<void> {
        await scope.sharedNative.hideLoading();
        scope.initDone = true;
        return;
    }

    /*
     * Async page loading sequence (primarily used within pullToRefresh)
     * @param scope          Pass `this` so page lifecycle can be managed from here
     * @param loadingMsg     A message to be shown with spinner
     */
    public async initAuto(scope: any, loadingMsg: string = ''): Promise<void> {
        scope.initDone = false;
        await scope.sharedNative.showLoading(loadingMsg);
        await scope.loadPage(true);
        await this.doneAuto(scope);
        return;
    }

    // noinspection JSMethodCanBeStatic
    public async doneAuto(scope: any): Promise<void> {
        await scope.sharedNative.hideLoading();
        scope.initDone = true;
        return;
    }

    /*
     * Synchronized page loading logic
     * Does not block the page while loading
     * WARN: initDone here is just a redundant flag
     * @param scope          Pass `this` so page lifecycle can be managed from here
     */
    // noinspection JSMethodCanBeStatic
    public async initSync(scope: any): Promise<void> {
        scope.initDone = false;
        await scope.loadPage();
        scope.initDone = true; // this.doneSync(scope);
        return;
    }

    // public doneSync(scope: any): void {
    //     scope.initDone = true;
    // }

    // noinspection JSMethodCanBeStatic
    public async errorLoading(scope: any, error: object | any): Promise<void> {
        await this.done(scope);
        if (error.hasOwnProperty('message')) {
            return scope.sharedNative.handleApiError(error.message);
        }
        return;
    }

    // noinspection JSMethodCanBeStatic
    public async errorLoadingSync(scope: any, error: object | any): Promise<void> {
        scope.initDone = true; // this.doneSync(scope);
        if (error.hasOwnProperty('message')) {
            return scope.sharedNative.handleApiError(error.message);
        }
        return;
    }

}
