import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SosPage } from './sos.page';

const routes: Routes = [
    {
        path: '',
        component: SosPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SosPage]
})
export class SosPageModule {}