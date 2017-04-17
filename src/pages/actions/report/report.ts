import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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
      private af: AngularFire,
      public data: DataProvider,
      public auth: AuthProvider) {

    this.action.reportingType = navParams.get('reportingType');
    this.action.pointValue = 99;
    this.pointHistory = af.database.list('/points/' + this.auth.uid + '/history');

    //this.lessons = af.database.list('/lessons');
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

  addLesson(){
    //this.lessons.push({'lastName': "Williams", 'missionName': "Random Mission"});
  }
 
  viewLesson(lesson){
    //let subscription = this.af.database.object('someLocation').subscribe(data=> {
      //do something with your data
    //})
    //subscription.unsubscribe();
  }
  ionViewDidLoad(){
    //this.addLesson();
    //console.log('ionViewDidLoad LessonsPage');
  }

}
