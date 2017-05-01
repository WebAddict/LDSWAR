import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthProvider } from '../../providers/auth';
//import { DataProvider } from '../../providers/data';

import { PointsLogPage } from '../points-log/points-log';
import { UserEditPage } from './edit/edit';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public user: FirebaseObjectObservable<any[]>;
  defaultAvatarUrl: string = "http://www.gravatar.com/avatar?d=mm&s=140";

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public auth: AuthProvider,
      afdb: AngularFireDatabase) {

    let uid = navParams.get('uid');
    if (!uid) {
      uid = this.auth.uid;
    }
    this.user = afdb.object('/users/' + uid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad User');
  }

  editProfile() {
    this.navCtrl.push(UserEditPage);
  }

  pointsLog() {
    this.navCtrl.push(PointsLogPage);
  }

}
