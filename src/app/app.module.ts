import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { WSet } from './app.component';

import { ApnPage } from '../pages/apn/apn';
import { DatePage } from '../pages/date/date';
import { MastersPage } from '../pages/masters/masters';
import { SosnPage } from '../pages/sosn/sosn';
import { QuicknPage } from '../pages/quickn/quickn';
import { ListenPage } from '../pages/listen/listen';
import { SettingsPage } from '../pages/settings/settings';
import { ContactsPage } from '../pages/contacts/contacts';
import { FactoryPage } from '../pages/factory/factory';
import { HelpPage } from '../pages/help/help';
import { HelpfullPage } from '../pages/helpfull/helpfull';
import { InfoPage } from '../pages/info/info';
import { ExtraPage } from '../pages/extra/extra';

import { CommandsPage } from '../pages/commands/commands';
import { SetupPage } from '../pages/setup/setup';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    WSet,
    ApnPage,
    DatePage,
    MastersPage,
    SosnPage,
    QuicknPage,
    ListenPage,
    SettingsPage,
    ContactsPage,
    FactoryPage,
    HelpPage,
    HelpfullPage,
    InfoPage,
    ExtraPage,
    CommandsPage,
    SetupPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(WSet),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WSet,
    ApnPage,
    DatePage,
    MastersPage,
    SosnPage,
    QuicknPage,
    ListenPage,
    SettingsPage,
    ContactsPage,
    FactoryPage,
    HelpPage,
    HelpfullPage,
    InfoPage,
    ExtraPage,
    CommandsPage,
    SetupPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
