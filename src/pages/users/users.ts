import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  public users: FirebaseListObservable<any[]>;
  public userRoot: string = '/'; // end with a slash

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      afdb: AngularFireDatabase) {

    //console.log(navParams);
    let which = navParams.get('which');
    if (which == 'organization') {
      this.userRoot = "/organization/allenRanch/";
    }
    this.users = afdb.list(this.userRoot + 'users');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UsersPage');
  }
  viewUser(user){
    //this.navCtrl.push(LessonsDetailPage, user);
  }
  editUser(user){
    //this.navCtrl.push(LessonsUpdatePage, user);
  }
  deleteUser(user){
    //this.lessons.remove(user);
  }

}
