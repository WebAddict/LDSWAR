import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth';
import * as moment from 'moment';

import { ReportActionsPage } from './report/report';
import { PointsLogPage } from '../points-log/points-log';

@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html'
})
export class ActionsPage {

  public points: FirebaseObjectObservable<any>;
  public currentUser: FirebaseObjectObservable<any>;

  classroom: boolean = false;
  dutyToGod: boolean = false;
  daily: boolean = false;
  friendToActivity: boolean = false;
  friendToChurch: boolean = false;
  indexing: boolean = false;
  journal: boolean = false;
  lesson: boolean = false;
  missionPrep: boolean = false;
  missionary: boolean = false;
  prayer: boolean = false;
  scouting: boolean = false;
  scripture: boolean = false;
  social: boolean = false;
  temple: boolean = false;
  testimony: boolean = false;
  weekly: boolean = false;

  show: boolean = false;

  classroomKey: string;
  dutyToGodKey: string;
  friendToActivityKey: string;
  friendToChurchKey: string;
  indexingKey: string;
  journalKey: string;
  lessonKey: string;
  missionPrepKey: string;
  missionaryKey: string;
  prayerKey: string;
  scoutingKey: string;
  scriptureKey: string;
  socialKey: string;
  templeKey: string;
  testimonyKey: string;

  dateKey: string;
  weekKey: string;

  //let point
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private auth: AuthProvider,
      afdb: AngularFireDatabase) {

    this.points = afdb.object('/points/' + this.auth.uid);
    this.currentUser = afdb.object('/users/' + this.auth.uid);
    
    let dateNow = moment().local();
    this.dateKey = dateNow.format('YYYY-MM-DD');
    this.weekKey = dateNow.format('YYYY-ww');

    this.classroomKey = 'classroom-' + this.dateKey;
    this.dutyToGodKey = 'dutyToGod-' + this.weekKey;
    this.friendToActivityKey = 'friendToActivity-' + this.weekKey;
    this.friendToChurchKey = 'friendToChurch-' + this.weekKey;
    this.indexingKey = 'indexing-' + this.dateKey;
    this.journalKey = 'journal-' + this.dateKey;
    this.lessonKey = 'lesson-' + this.dateKey;
    this.missionPrepKey = 'missionPrep-' + this.weekKey;
    this.missionaryKey = 'missionary-' + this.dateKey;
    this.prayerKey = 'prayer-' + this.dateKey;
    this.scoutingKey = 'scouting-' + this.weekKey;
    this.scriptureKey = 'scripture-' + this.dateKey;
    this.socialKey = 'social-' + this.dateKey;
    this.templeKey = 'temple-' + this.weekKey;
    this.testimonyKey = 'testimony-' + this.dateKey;

    afdb.list('/pointLogs/' + this.auth.uid, { preserveSnapshot: true }).subscribe(snapshots => {
      this.reset();
      snapshots.forEach(snapshot => {
        if (snapshot.key == this.classroomKey) {
          this.classroom = true;
        } else if (snapshot.key == this.dutyToGodKey) {
          this.dutyToGod = true;
        } else if (snapshot.key == this.friendToActivityKey) {
          this.friendToActivity = true;
        } else if (snapshot.key == this.friendToChurchKey) {
          this.friendToChurch = true;
        } else if (snapshot.key == this.indexingKey) {
          this.indexing = true;
        } else if (snapshot.key == this.journalKey) {
          this.journal = true;
        } else if (snapshot.key == this.lessonKey) {
          this.lesson = true;
        } else if (snapshot.key == this.missionPrepKey) {
          this.missionPrep = true;
        } else if (snapshot.key == this.missionaryKey) {
          this.missionary = true;
        } else if (snapshot.key == this.prayerKey) {
          this.prayer = true;
        } else if (snapshot.key == this.scoutingKey) {
          this.scouting = true;
        } else if (snapshot.key == this.scriptureKey) {
          this.scripture = true;
        } else if (snapshot.key == this.socialKey) {
          this.social = true;
        } else if (snapshot.key == this.templeKey) {
          this.temple = true;
        } else if (snapshot.key == this.testimonyKey) {
          this.testimony = true;
        }
        if (this.prayer && this.scripture && this.lesson && this.journal) {
          this.daily = true;
        } else {
          this.daily = false;
        }
        if (this.dutyToGod && this.temple && this.testimony && this.scouting && this.missionPrep) {
          this.weekly = true;
        } else {
          this.weekly = false;
        }
      });
    }, error => {
      console.log(error);
    });

  }
  reset() {
    this.classroom = false;
    this.dutyToGod = false;
    this.friendToActivity = false;
    this.friendToChurch = false;
    this.indexing = false;
    this.journal = false;
    this.lesson = false;
    this.missionPrep = false;
    this.missionary = false;
    this.prayer = false;
    this.scouting = false;
    this.scripture = false;
    this.social = false;
    this.temple = false;
    this.testimony = false;
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad ActionsPage');
  }
  addPoints(type='unknown') {
    //this.pointHistory.push({pointValue: points});
    let action = {reportingType: type}
    this.navCtrl.push(ReportActionsPage, action);
  }

  pointsLog() {
    this.navCtrl.push(PointsLogPage);
  }

}
