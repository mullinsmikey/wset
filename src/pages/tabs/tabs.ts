import { Component } from '@angular/core';

import { SetupPage } from '../setup/setup';
import { CommandsPage } from '../commands/commands';
import { ExtraPage } from '../extra/extra';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SetupPage;
  tab2Root = CommandsPage;
  tab3Root = ExtraPage;

  constructor() {}
}
