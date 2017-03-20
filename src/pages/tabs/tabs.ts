import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { LessonsPage } from '../lessons/lessons';
import { ActionsPage } from '../actions/actions';
import { RewardsPage } from '../rewards/rewards';
import { MissionariesPage } from '../missionaries/missionaries';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  feedRoot: any = HomePage;
  lessonsRoot: any = LessonsPage;
  actionsRoot: any = ActionsPage;
  rewardsRoot: any = RewardsPage;
  missionariesRoot: any = MissionariesPage;

  constructor() {

  }
}
