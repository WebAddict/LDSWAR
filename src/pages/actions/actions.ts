import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth';

import { ReportActionsPage } from './report/report';
import { PointsLogPage } from '../points-log/points-log';

@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html'
})
export class ActionsPage {

  public points: FirebaseObjectObservable<any>;
  //let point
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private auth: AuthProvider,
      afdb: AngularFireDatabase) {

    this.points = afdb.object('/points/' + this.auth.uid);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionsPage');
  }
  addPoints(points: number, type='unknown') {
    //this.pointHistory.push({pointValue: points});
    let action = {reportingType: type}
    this.navCtrl.push(ReportActionsPage, action);
  }

  pointsLog() {
    this.navCtrl.push(PointsLogPage);
  }

}
