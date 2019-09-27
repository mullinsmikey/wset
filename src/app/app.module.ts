import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SMS } from '@ionic-native/sms';
import { WSet } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';
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
import { Security, Messages } from '../providers';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    WSet,
    WelcomePage,
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
    WelcomePage,
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
    Security,
    Messages,
    SMS,
    StatusBar,
    SplashScreen,
    Diagnostic,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
