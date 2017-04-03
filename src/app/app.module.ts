import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { LDSWarApp } from './app.component';

// Importing AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Importing Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';

// Importing Pages
import { ActionsPage } from '../pages/actions/actions';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { HomePage } from '../pages/home/home';
import { LessonsPage } from '../pages/lessons/lessons';
import { LessonsDetailPage } from '../pages/lessons/detail/detail';
import { LessonsUpdatePage } from '../pages/lessons/update/update';
import { LibraryPage } from '../pages/library/library';
import { LoginPage } from '../pages/login/login';
import { MissionariesPage } from '../pages/missionaries/missionaries';
import { PrivacyPage } from '../pages/privacy/privacy';
import { RewardsPage } from '../pages/rewards/rewards';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TermsPage } from '../pages/terms/terms';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { UsersPage } from '../pages/users/users';
import { WelcomePage } from '../pages/welcome/welcome';

import { MainPage } from '../pages/pages';

// Importing Providers
import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

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

let pages = [
  LDSWarApp,
  ActionsPage,
  ForgotPasswordPage,
  HomePage,
  LessonsPage,
  LessonsDetailPage,
  LessonsUpdatePage,
  LibraryPage,
  LoginPage,
  MainPage,
  MissionariesPage,
  PrivacyPage,
  RewardsPage,
  SignupPage,
  TabsPage,
  TermsPage,
  TutorialPage,
  UsersPage,
  WelcomePage
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    StatusBar,
    SplashScreen,
    DataProvider,
    AuthProvider,
    Facebook,
    TwitterConnect,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    IonicModule.forRoot(LDSWarApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
