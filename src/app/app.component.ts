import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  lessons: FirebaseListObservable<any[]>;
  constructor(platform: Platform, af: AngularFire) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.lessons = af.database.list('/lessons');
    });
  }
}
