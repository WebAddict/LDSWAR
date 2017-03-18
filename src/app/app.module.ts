import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Importing AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Importing Providers
import { AuthService } from '../providers/auth-service';

// Importing Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MissionariesPage } from '../pages/missionaries/missionaries';

export const firebaseConfig = {
  apiKey: 'AIzaSyDsj62-5wjG0lOkRCOzOu-jv46DGQ6xl6g',
  authDomain: 'ldswar-ab4a8.firebaseapp.com',
  databaseURL: 'https://ldswar-ab4a8.firebaseio.com',
  storageBucket: 'ldswar-ab4a8.appspot.com',
  messagingSenderId: '<your-messaging-sender-id>'
};
export const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MissionariesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp) ,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MissionariesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
