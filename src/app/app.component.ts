import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { MissionariesPage } from '../pages/missionaries/missionaries';
import { LessonsPage } from '../pages/lessons/lessons';
import { ActionsPage } from '../pages/actions/actions';
import { RewardsPage } from '../pages/rewards/rewards';

import { AuthService } from '../providers/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class LDSWarApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TabsPage;
  public pages: Array<{title: string, component: any, icon: any}>;
  constructor(public platform: Platform, public AuthService: AuthService, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Tabed Page', component: TabsPage, icon: 'browsers' },
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Lessons', component: LessonsPage, icon: 'book' },
      { title: 'Actions', component: ActionsPage, icon: 'compass' },
      { title: 'Rewards', component: RewardsPage, icon: 'cart' },
      { title: 'Missionaries', component: MissionariesPage, icon: 'bicycle' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
