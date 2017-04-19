import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthProvider } from '../../../providers/auth';
import { DataProvider } from '../../../providers/data';


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
      public auth: AuthProvider) {

    this.action.reportingType = navParams.get('reportingType');
    this.action.pointValue = 99;
    //this.pointHistory = afdb.list('/points/' + this.auth.uid + '/history');

    //this.lessons = afdb.list('/lessons');
    this.auth.getUserData().subscribe(userData => {
      this.user = userData;
      this.action.uid = userData.$key;
      console.log('Set user uid to ', userData);
    }, err => {
      console.log(err)
    });
  }

  save() {
    this.pointHistory.push(this.action).then(() => {
    //this.pointHistory.push('/points', this.action).subscribe(key => {
      //console.log('saved', key);
      this.navCtrl.pop();
    }, err => {
      console.log(err)
    });
  }

  ionViewDidLoad(){
  }

}
