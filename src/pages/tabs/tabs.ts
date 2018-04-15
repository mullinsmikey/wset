import { Component } from '@angular/core';

// import { InfoPage } from '../info/info';
import { CommandsPage } from '../commands/commands';
import { ExtraPage } from '../extra/extra';
import { SetupPage } from '../setup/setup';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SetupPage;
  tab2Root = CommandsPage;
  tab3Root = ExtraPage;

  constructor() {}
}
