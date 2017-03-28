import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { LDSWarApp } from './app.component';

// Importing AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Importing Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

// Importing Pages
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MissionariesPage } from '../pages/missionaries/missionaries';
import { LessonsPage } from '../pages/lessons/lessons';
import { ActionsPage } from '../pages/actions/actions';
import { RewardsPage } from '../pages/rewards/rewards';
import { LibraryPage } from '../pages/library/library';
import { UsersPage } from '../pages/users/users';

// Importing Providers
import { AuthService } from '../providers/auth-service';

export const myFirebaseConfig = {
  apiKey: 'AIzaSyDsj62-5wjG0lOkRCOzOu-jv46DGQ6xl6g',
  authDomain: 'ldswar-ab4a8.firebaseapp.com',
  databaseURL: 'https://ldswar-ab4a8.firebaseio.com',
  storageBucket: 'ldswar-ab4a8.appspot.com',
  messagingSenderId: '156611440340'
};
export const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}

@NgModule({
  declarations: [
    LDSWarApp,
    HomePage,
    TabsPage,
    MissionariesPage,
    LessonsPage,
    ActionsPage,
    RewardsPage,
    LibraryPage,
    UsersPage
  ],
  imports: [
    IonicModule.forRoot(LDSWarApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LDSWarApp,
    HomePage,
    TabsPage,
    MissionariesPage,
    LessonsPage,
    ActionsPage,
    RewardsPage,
    LibraryPage,
    UsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
