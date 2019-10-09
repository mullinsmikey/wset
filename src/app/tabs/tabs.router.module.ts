/* tslint:disable:max-line-length */
import { NgModule } from '@angular/core';

import { Route, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routeSetup: Route = {
    path: 'setup', // /tabs/setup
    children: [{ path: '', loadChildren: () => import('../pages/setup/setup.module').then(m => m.SetupPageModule) }]
};

const routeCommands: Route = {
    path: 'commands', // /tabs/commands
    children: [
        { path: '', loadChildren: () => import('../pages/commands/commands.module').then(m => m.CommandsPageModule) },
        // {
        //     path: 'category/:id', // /tabs/catalog/category/:id
        //     children: [{ path: '', loadChildren: () => import('../pages/catalog-categories/categories.module').then(m => m.CategoriesPageModule) }]
        // },
        // {
        //     path: 'category/:id/products', // /tabs/catalog/category/:id/products
        //     children: [{ path: '', loadChildren: () => import('../pages/catalog-category/category.module').then(m => m.CategoryPageModule) }]
        // }
    ]
};

const routeExtra: Route = {
    path: 'extra', // /tabs/extra
    children: [{ path: '', loadChildren: () => import('../pages/extra/extra.module').then(m => m.ExtraPageModule) }]
};

const routeEmpty: Route = { path: '', redirectTo: '/tabs/setup', pathMatch: 'full' };
const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            routeSetup,
            routeCommands,
            routeExtra,
            routeEmpty
        ]
    },
    routeEmpty,
    { path: '/tabs', redirectTo: '/tabs/setup', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {}
