import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthProvider } from '../../../providers/auth';
import { DataProvider } from '../../../providers/data';

import { UserOrganizationPage } from '../organization/organization';

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit.html',
})
export class UserEditPage {

  //public user: FirebaseObjectObservable<any[]>;
  user: any;
  error: string;
  uid: string;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public auth: AuthProvider,
      public data: DataProvider,
      afdb: AngularFireDatabase) {

    this.uid = navParams.get('uid');
    if (!this.uid) {
      this.uid = this.auth.uid;
    }
    //afdb.object('/users/' + this.uid).subscribe(snapshots => {
    this.data.getSnapshot('/users/' + this.uid).subscribe(data => {
      //console.log(data);
      this.user = data.val();
    }, err => {
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad User');
  }

  saveUser() {
    this.user.displayName = this.user.firstName + ' ' + this.user.lastName;
    this.data.update('/users/' + this.uid, this.user).subscribe(key => {
      this.navCtrl.pop();
    }, err => {
      console.log(err);
    });
  }

  editOrganization() {
    this.navCtrl.push(UserOrganizationPage);
  }

}
