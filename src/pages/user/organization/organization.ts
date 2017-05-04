import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthProvider } from '../../../providers/auth';
import { DataProvider } from '../../../providers/data';


@IonicPage()
@Component({
  selector: 'page-organization-user',
  templateUrl: 'organization.html',
})
export class UserOrganizationPage {

  //public user: FirebaseObjectObservable<any[]>;
  user: any;
  public organizationList: FirebaseListObservable<any[]>;
  public organizationGroups: FirebaseListObservable<any[]>;
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
    this.organizationList = this.data.list('/organizations');
    this.organizationGroups = this.data.list('/organizationGroups');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad User');
  }

  saveOrganization() {
    this.data.set('/users/' + this.uid + '/organization', this.user.organization).subscribe(key => {
      this.navCtrl.pop();
    }, err => {
      console.log(err);
    });
  }

}
