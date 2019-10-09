import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CommandsPage } from './commands.page';

const routes: Routes = [
    {
        path: '',
        component: CommandsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [CommandsPage]
})
export class CommandsPageModule {}
