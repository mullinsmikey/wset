import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ApnPage } from './apn.page';

const routes: Routes = [
    {
        path: '',
        component: ApnPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ApnPage]
})
export class ApnPageModule {}
