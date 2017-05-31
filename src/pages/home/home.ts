import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuController, AlertController, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { DataProvider } from '../../providers/data';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public hits: number;
  public menuenabled: boolean = false;
  public currentUser: FirebaseObjectObservable<any[]>;
  public feedItemsObservable: FirebaseListObservable<any[]>;
  public feedItems: Array<any> = [];
  public predicate: string = "postDate";
  public reverse: boolean = true;
  public canShare: boolean = false;
  public showCountdown: boolean = false;
  public counter: string;
  public WarBegins: any;
  private interval: any;

  constructor(
      private navCtrl: NavController,
      private menu: MenuController,
      public auth: AuthProvider,
      public data: DataProvider,
      private fbApp: FirebaseApp,
      private afdb: AngularFireDatabase,
      private alertController: AlertController,
      public sanitizer: DomSanitizer,
      private storage: Storage) {
    
    this.WarBegins = moment("2017-06-01");

    //this.feedItems.push(1);
    if (this.auth.uid) {
      this.currentUser = this.data.object('/users/' + this.auth.uid);
      this.feedItemsObservable = this.afdb.list('/organization/allenRanch/feed', {
        preserveSnapshot: true,
        query: {
          orderByChild: 'postDate'
        }
      });
      // subscribe to changes
      this.feedItemsObservable.subscribe(snapshots => {
        //console.log(snapshots);
        this.feedItems = [];
        snapshots.forEach(snapshot => {
          this.feedItems.push(snapshot.val());
          console.log(snapshot.val());
        });
      });
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
  updateCounter() {
    let now = moment();
    if (now.isAfter(this.WarBegins)) {
      this.counter = "";
      this.showCountdown = false;
      clearInterval(this.interval);
    }
    let difference = this.WarBegins.diff(now);

    // get total seconds between the times
    var delta = Math.abs(difference) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = Math.floor(delta) % 60;  // in theory the modulus is not required

    this.counter = days + " days, " + hours + " hours, " + minutes + " mins, " + seconds + " sec";
  }

  like() {
    let alert = this.alertController.create({
      title: 'Coming Soon',
      message: "The 'Like' feature is coming soon",
      buttons: ['Ok']
    });
    alert.present();
  }

  comment() {
    let alert = this.alertController.create({
      title: 'Coming Soon',
      message: "The 'Comment' feature is coming soon",
      buttons: ['Ok']
    });
    alert.present();
  }
  postTime(postDate) {
    let thePostMoment = moment(postDate);
    let alert = this.alertController.create({
      title: 'Posted Date',
      message: thePostMoment.toISOString(),
      buttons: ['Ok']
    });
    alert.present();
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
  ionViewWillEnter(){
    let now = moment();
    if (now.isBefore(this.WarBegins)) {
      this.showCountdown = true;
      this.interval = setInterval(() => { this.updateCounter(); }, 1000);
    }
  }
  ionViewWillLeave(){
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
