import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth';

import { DataProvider } from '../../providers/data';
import { PointsProvider } from '../../providers/points';

@Component({
  selector: 'page-points-log',
  templateUrl: 'points-log.html'
})
export class PointsLogPage {

  public userPoints: FirebaseObjectObservable<any>;
  public pointHistory: FirebaseListObservable<any>;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public data: DataProvider,
      public auth: AuthProvider,
      public points: PointsProvider) {

    this.userPoints = this.data.object('/points/' + this.auth.uid);
    this.pointHistory = this.data.list('/points/' + this.auth.uid + '/history');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsLogPage');
  }

  deletePoint(point) {
    this.points.delete(point).subscribe(key => {
    }, err => {
      console.log(err)
    });
  }

  wipePoints() {
    this.points.wipe().subscribe(key => {
      this.navCtrl.pop();
    }, err => {
      console.log(err)
    });
  }

}
