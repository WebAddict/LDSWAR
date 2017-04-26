import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { FirebaseListObservable } from 'angularfire2/database';

import { AuthProvider } from '../../../providers/auth';
import { DataProvider } from '../../../providers/data';
import { PointsProvider } from '../../../providers/points';


@Component({
  selector: 'page-report-actions',
  templateUrl: 'report.html'
})
export class ReportActionsPage {

  public action: {reportingType: string, title: string, description: string, uid: string, pointValue: number} = {
    reportingType: '',
    title: '',
    description: '',
    uid: '',
    pointValue: 0
  };
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

    this.action.reportingType = navParams.get('reportingType');
    this.action.pointValue = 99;
    this.pointHistory = this.data.list('/points/' + this.auth.uid + '/history');
    this.action.uid = this.auth.uid;
  }

  save() {
    //this.pointHistory.push(this.action).then(() => {
    this.points.add(this.action).subscribe(key => {
      //console.log('saved', key);
      this.navCtrl.pop();
    }, err => {
      console.log(err)
    });
  }

  ionViewDidLoad(){
  }

}
