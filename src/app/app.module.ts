import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { LDSWarApp } from './app.component';

// Importing AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

// Importing Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';

// Importing Pages
import { ActionsPage } from '../pages/actions/actions';
import { ReportActionsPage } from '../pages/actions/report/report';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { HomePage } from '../pages/home/home';
import { LessonsPage } from '../pages/lessons/lessons';
import { LessonsDetailPage } from '../pages/lessons/detail/detail';
import { LessonsUpdatePage } from '../pages/lessons/update/update';
import { LessonsAddPage } from '../pages/lessons/add/add';
import { LibraryPage } from '../pages/library/library';
import { LoginPage } from '../pages/login/login';
import { MissionariesPage } from '../pages/missionaries/missionaries';
import { PointsLogPage } from '../pages/points-log/points-log';
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
import { PointsProvider } from '../providers/points';

export const myFirebaseConfig = {
  apiKey: 'AIzaSyDsj62-5wjG0lOkRCOzOu-jv46DGQ6xl6g',
  authDomain: 'ldswar-ab4a8.firebaseapp.com',
  databaseURL: 'https://ldswar-ab4a8.firebaseio.com',
  storageBucket: 'ldswar-ab4a8.appspot.com',
  messagingSenderId: '156611440340'
};

let pages = [
  LDSWarApp,
  ActionsPage,
  ReportActionsPage,
  ForgotPasswordPage,
  HomePage,
  LessonsPage,
  LessonsDetailPage,
  LessonsUpdatePage,
  LessonsAddPage,
  LibraryPage,
  LoginPage,
  MainPage,
  MissionariesPage,
  PointsLogPage,
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
    PointsProvider,
    Facebook,
    TwitterConnect,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    IonicModule.forRoot(LDSWarApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(myFirebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
