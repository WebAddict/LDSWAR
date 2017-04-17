import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
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
      af: AngularFire) {

    this.points = af.database.object('/points/' + this.auth.uid);
    this.pointHistory = af.database.list('/points/' + this.auth.uid + '/history');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsLogPage');
  }

}
