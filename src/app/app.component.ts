import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirstRunPage } from '../pages/pages';

import { TutorialPage } from '../pages/tutorial/tutorial';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { MissionariesPage } from '../pages/missionaries/missionaries';
import { LessonsPage } from '../pages/lessons/lessons';
import { ActionsPage } from '../pages/actions/actions';
import { RewardsPage } from '../pages/rewards/rewards';

import { AuthProvider } from '../providers/auth';
import { DataProvider } from '../providers/data';

@Component({
  templateUrl: 'app.html'
})
export class LDSWarApp {

  @ViewChild(Nav) nav: Nav;
  isAppInitialized: boolean = false;
  user: any;
  rootPage: any = FirstRunPage;
  public pages: Array<{title: string, component: any, icon: any}>;

  constructor(
      private platform: Platform,
      private data: DataProvider,
      public auth: AuthProvider,
      private menu: MenuController,
      private statusBar: StatusBar,
      private splashScreen: SplashScreen) {

    this.user = {
      image: ''
    };

    //this.initializeApp();
    this.platform.ready().then(() => {
      this.menu.enable(false);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.auth.getUserData().subscribe(data => {
        this.menu.enable(true);
        this.user = data;
        this.pages = [
          { title: 'Tabed Page', component: TabsPage, icon: 'browsers' },
          { title: 'Home', component: HomePage, icon: 'home' },
          { title: 'Lessons', component: LessonsPage, icon: 'book' },
          { title: 'Actions', component: ActionsPage, icon: 'compass' },
          { title: 'Rewards', component: RewardsPage, icon: 'cart' },
          { title: 'Missionaries', component: MissionariesPage, icon: 'bicycle' }
        ];
        if (!this.isAppInitialized) {
          this.nav.setRoot(TabsPage);
          this.isAppInitialized = true;
        }
        this.data.list('pets').subscribe(data => {
          console.log(data);
        });
      }, err => {
        this.pages = [];
        this.nav.setRoot(FirstRunPage);
      });

      this.splashScreen.hide();
    });
  }

  initializeApp() {
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
