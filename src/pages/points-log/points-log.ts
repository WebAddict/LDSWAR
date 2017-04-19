import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-points-log',
  templateUrl: 'points-log.html'
})
export class PointsLogPage {

  public points: FirebaseObjectObservable<any>;
  public pointHistory: FirebaseListObservable<any>;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private auth: AuthProvider,
      afdb: AngularFireDatabase) {

    this.points = afdb.object('/points/' + this.auth.uid);
    this.pointHistory = afdb.list('/points/' + this.auth.uid + '/history');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsLogPage');
  }

}
