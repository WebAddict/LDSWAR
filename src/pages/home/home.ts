import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { DataProvider } from '../../providers/data';
import { FirebaseApp } from 'angularfire2';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public hits: number;
  public menuenabled: boolean = false;
  public currentUser: FirebaseObjectObservable<any[]>;
  //public feedItems: Array<any> = [];
  public feedItems: FirebaseListObservable<any[]>;

  constructor(
      private navCtrl: NavController,
      private menu: MenuController,
      public auth: AuthProvider,
      public data: DataProvider,
      private fbApp: FirebaseApp,
      private storage: Storage) {

    //this.feedItems.push(1);
    if (this.auth.uid) {
      this.currentUser = this.data.object('/users/' + this.auth.uid);
      this.feedItems = this.data.list('/organization/allenRanch/feed');
      //console.log(auth.currentUser);
      //var ref = this.fbApp.database().ref('/organization/allenRanch/feed');
      //ref.orderByKey().limitToLast(5).on("child_added", function(snapshot) {
        // This callback will be triggered exactly two times, unless there are
        // fewer than two dinosaurs stored in the Database. It will also get fired
        // for every new, heavier dinosaur that gets added to the data set.
      //  console.log(snapshot.val());
        //if (!this.feedItems || !this.feedItems.length) {
          //this.feedItems = [snapshot.val()];
        //} else {
      //    this.feedItems.push(1);
        //}
      //});
    }
    storage.get('totalHits').then((val) => {
      if (val && val > 0) {
        this.hits = val + 1;
      } else {
        this.hits = 1;
      }
      console.log("got " + this.hits + " hits (" + val + " from storage)");
      storage.set('totalHits', this.hits);
    })

  }

  logout() {
    this.auth.logout().subscribe(function() {
      this.navCtrl.setRoot(WelcomePage);
    });
  }

  login() {
    this.navCtrl.setRoot(WelcomePage);
  }

  addItem(){
  }
 
  viewItem(){
 
  }
  ionViewDidLoad(){
  }
}
