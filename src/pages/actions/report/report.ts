import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { FirebaseListObservable } from 'angularfire2/database';

import { AuthProvider } from '../../../providers/auth';
import { DataProvider } from '../../../providers/data';
import { PointsProvider, ReportPoints } from '../../../providers/points';


@Component({
  selector: 'page-report-actions',
  templateUrl: 'report.html'
})
export class ReportActionsPage {

  public reportPoints: ReportPoints;
  public user: any;

  public lessons: FirebaseListObservable<any[]>;
  public pointHistory: FirebaseListObservable<any>;
  constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      //private afdb: AngularFireDatabase,
      public data: DataProvider,
      public auth: AuthProvider,
      public points: PointsProvider) {

    let reportType = navParams.get('reportingType');
    this.reportPoints = new ReportPoints(reportType);
    this.pointHistory = this.data.list('/points/' + this.auth.uid + '/history');
  }

  save() {
    //this.pointHistory.push(this.action).then(() => {
    this.points.add(this.reportPoints).subscribe(key => {
      //console.log('saved', key);
      this.navCtrl.pop();
    }, err => {
      console.log(err)
    });
  }

  ionViewDidLoad(){
  }

}
