import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    constructor(
        private storage: Storage
    ) {
    }

    async configGet(key, fallback): Promise<any> {
        const value = await this.storage.get(key);
        return (value === null) ? fallback : value;
    }

    // Caches
    // ---------------------------------------------------

    // async fnInvalidateCaches() {
    //     await this.storage.forEach(async (val, key) => {
    //         if (key.includes('catalog.') || key.includes('profile.')) {
    //             return await this.storage.remove(key);
    //         }
    //     });
    //     return;
    // }

    // Firebase Analytics toggle
    // ---------------------------------------------------

    // async fnIsAnalyticsEnabled(): Promise<boolean> {
    //     await this.storage.ready();
    //     const isNowEnabled: boolean | null = await this.storage.get('analytics');
    //
    //     if (isNowEnabled === null) {
    //         return await this.fnToggleAnalytics(true);
    //     }
    //     return isNowEnabled;
    // }

    // async fnToggleAnalytics(isEnabled: boolean): Promise<boolean> {
    //     await Promise.all([
    //         this.storage.set('analytics', isEnabled),
    //         this.firebase.setAnalyticsCollectionEnabled(isEnabled)
    //     ]);
    //     return isEnabled;
    // }

    // async fnCheckFireTokenChange() {
    //     const fireToken = await this.firebase.onTokenRefresh().toPromise();
    //     await this.firebaseFactory.fnSaveFirebaseToken(fireToken);
    //     return;
    // }

}
