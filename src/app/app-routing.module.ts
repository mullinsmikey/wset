import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', loadChildren: () =>
            import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'ap-network', loadChildren: () =>
            import('./pages/ap-network/apn.module').then(m => m.ApnPageModule)
    },
    {
        path: 'server-ip', loadChildren: () =>
            import('./pages/server-ip/server.module').then(m => m.ServerPageModule)
    },
    {
        path: 'time-lang', loadChildren: () =>
            import('./pages/time-lang/time.module').then(m => m.TimePageModule)
    },
    {
        path: 'masters', loadChildren: () =>
            import('./pages/masters/masters.module').then(m => m.MastersPageModule)
    },
    {
        path: 'sos-nums', loadChildren: () =>
            import('./pages/sos-nums/sos.module').then(m => m.SosPageModule)
    },
    {
        path: 'quick-nums', loadChildren: () =>
            import('./pages/quick-nums/quick.module').then(m => m.QuickPageModule)
    },
    {
        path: 'eavesdrop', loadChildren: () =>
            import('./pages/eavesdrop/eavesdrop.module').then(m => m.EavesdropPageModule)
    },
    {
        path: 'watch-conf', loadChildren: () =>
            import('./pages/watch-conf/conf.module').then(m => m.ConfPageModule)
    },
    {
        path: 'contacts', loadChildren: () =>
            import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule)
    },
    {
        path: 'help-full', loadChildren: () =>
            import('./pages/help-full/help.module').then(m => m.HelpPageModule)
    },
    {
        path: 'factory', loadChildren: () =>
            import('./pages/factory/factory.module').then(m => m.FactoryPageModule)
    },
    {
        path: 'about', loadChildren: () =>
            import('./pages/about/about.module').then(m => m.AboutPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
