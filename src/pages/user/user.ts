import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthProvider } from '../../providers/auth';
//import { DataProvider } from '../../providers/data';

import { PointsLogPage } from '../points-log/points-log';
import { UserEditPage } from './edit/edit';
import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public user: FirebaseObjectObservable<any[]>;
  defaultAvatarUrl: string = "http://www.gravatar.com/avatar?d=mm&s=140";
  public uid: string;
  public isMe: boolean = false;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public auth: AuthProvider,
      afdb: AngularFireDatabase) {

    this.uid = navParams.get('uid');
    if (!this.uid) {
      this.uid = this.auth.uid;
      this.isMe = true;
    }
    this.user = afdb.object('/users/' + this.uid);
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

  logout() {
    this.auth.logout().subscribe(function() {
      this.navCtrl.setRoot(WelcomePage);
    });
  }

}
