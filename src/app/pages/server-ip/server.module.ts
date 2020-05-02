import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ServerPage } from './server.page';

const routes: Routes = [
    {
        path: '',
        component: ServerPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ServerPage]
})
export class ServerPageModule {}