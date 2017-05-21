import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, NavController, Platform } from 'ionic-angular';
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
import { UserPage } from '../pages/user/user';
import { UsersPage } from '../pages/users/users';
import { WelcomePage } from '../pages/welcome/welcome';

import { AuthProvider } from '../providers/auth';
import { DataProvider } from '../providers/data';

import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app'; // app and typings
import { Observable } from 'rxjs/Observable';

// todo
// https://developers.google.com/android/guides/client-auth
@Component({
  templateUrl: 'app.html'
})
export class LDSWarApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = FirstRunPage;
  public pages: Array<{headingTitle: string, pages: Array<{title: string, component: any, icon: any, params?: any}>}>;

  // revised
  //public firebaseUser: firebase.User;
  public currentUser: FirebaseObjectObservable<any[]>;
  isAppInitialized: boolean = false;

  constructor(
      public fbApp: FirebaseApp,
      public afdb: AngularFireDatabase,
      public afAuth: AngularFireAuth,
      private platform: Platform,
      private data: DataProvider,
      public auth: AuthProvider,
      private menu: MenuController,
      private statusBar: StatusBar,
      private splashScreen: SplashScreen) {

    //this.initializeApp();

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
      }

      this.auth.firebaseUser.subscribe(firebaseUser => {
        if (!firebaseUser) {
          if (this.menu) {
            this.menu.enable(false);
          }
          this.pages = [
            { headingTitle: 'My Account', pages: [
              { title: 'Login', component: WelcomePage, icon: 'person' },
            ]},
          ];
          this.isAppInitialized = false;
	  if (this.nav) {
            this.nav.setRoot(FirstRunPage);
	  }
        } else {
          this.currentUser = afdb.object('/users/' + firebaseUser.uid);
          if (this.menu) {
            this.menu.enable(true);
          }
          this.pages = [
            { headingTitle: 'My Account', pages: [
              { title: 'My Profile', component: UserPage, icon: 'person' },
              //{ title: 'My Points', component: TabsPage, icon: 'flash' },
            ]},
            { headingTitle: 'My Sections', pages: [
              //{ title: 'Tabed Page', component: TabsPage, icon: 'browsers' },
              { title: 'Home', component: HomePage, icon: 'home' },
              { title: 'Lessons', component: LessonsPage, icon: 'book' },
              { title: 'Actions', component: ActionsPage, icon: 'compass' },
              //{ title: 'Rewards', component: RewardsPage, icon: 'cart' },
              //{ title: 'Missionaries', component: MissionariesPage, icon: 'bicycle' },
            ]},
          ];
          if (!this.isAppInitialized) {
            this.isAppInitialized = true;
	    if (this.nav) {
              this.nav.setRoot(TabsPage);
	    }
          }
        }
      });

      if (this.platform.is('cordova')) {
        this.splashScreen.hide();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.menu) {
        this.menu.enable(false);
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
      }

      // WATCH USER ACCOUNT
      this.auth.getUserData().subscribe(data => {
        if (this.menu) {
          this.menu.enable(true);
        }
        //this.user = data;
        this.pages = [
	      { headingTitle: 'My Account', pages: [
            { title: 'My Profile', component: UserPage, icon: 'person' },
            { title: 'My Points', component: TabsPage, icon: 'flash' },
          ]},
          { headingTitle: 'My Sections', pages: [
            { title: 'Tabed Page', component: TabsPage, icon: 'browsers' },
            { title: 'Home', component: HomePage, icon: 'home' },
            { title: 'Lessons', component: LessonsPage, icon: 'book' },
            { title: 'Actions', component: ActionsPage, icon: 'compass' },
            { title: 'Rewards', component: RewardsPage, icon: 'cart' },
            { title: 'Missionaries', component: MissionariesPage, icon: 'bicycle' },
          ]},
          { headingTitle: 'My Organization', pages: [
            { title: 'Users', component: UsersPage, icon: 'people', params: {which: 'organization'} },
            { title: 'Lessons', component: LessonsPage, icon: 'book', params: {which: 'organization'} },
            { title: 'Rewards', component: RewardsPage, icon: 'cart', params: {which: 'organization'} },
            { title: 'Missionaries', component: MissionariesPage, icon: 'bicycle', params: {which: 'organization'} },
          ]},
          { headingTitle: 'Admin', pages: [
            { title: 'Users', component: UsersPage, icon: 'people', params: {which: 'system'} },
            { title: 'Lessons', component: LessonsPage, icon: 'book', params: {which: 'system'} },
            { title: 'Moderation', component: TabsPage, icon: 'flag' },
	      ]}
        ];
        if (!this.isAppInitialized) {
          this.isAppInitialized = true;
          this.nav.setRoot(TabsPage);
        }
      }, err => {
        this.pages = [
          { headingTitle: 'My Account', pages: [
                { title: 'Login', component: WelcomePage, icon: 'person' },
          ]},
        ];
        this.isAppInitialized = false;
        if (this.menu) {
          this.menu.enable(false);
        }
        this.nav.setRoot(FirstRunPage);
      });
      if (this.platform.is('cordova')) {
        this.splashScreen.hide();
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (this.nav) {
      this.nav.setRoot(page.component, page.params);
    }
  }

  logout() {
    this.auth.logout().subscribe(function() {
      if (this.menu) {
        this.menu.enable(false);
      }
      if (this.nav) {
        this.nav.setRoot(WelcomePage);
      }
    });
  }
}
