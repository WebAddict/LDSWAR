import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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
      af: AngularFire) {

    //console.log(navParams);
    let which = navParams.get('which');
    if (which == 'organization') {
      this.userRoot = "/organization/allenRanch/";
    }
    this.users = af.database.list(this.userRoot + 'users');
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
