import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthProvider } from '../../../providers/auth';
//import { DataProvider } from '../../../providers/data';


@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit.html',
})
export class UserEditPage {

  public user: FirebaseObjectObservable<any[]>;

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

}
