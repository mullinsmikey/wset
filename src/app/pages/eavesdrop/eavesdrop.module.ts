import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { EavesdropPage } from './eavesdrop.page';

const routes: Routes = [
    {
        path: '',
        component: EavesdropPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [EavesdropPage]
})
export class EavesdropPageModule {}
