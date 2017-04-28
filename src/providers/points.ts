import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { AuthProvider } from './auth';
import { DataProvider } from './data';

export class UserPoints {
  availableToSpend: number;
  classroom: number;
  dutyToGod: number;
  friendToActivity: number;
  friendToChurch: number;
  indexing: number;
  journal: number;
  lesson: number;
  missionPrep: number;
  missionary: number;
  prayer: number;
  scouting: number;
  scripture: number;
  social: number;
  spent: number;
  temple: number;
  testimony: number;
  total: number;
  constructor() {
    this.availableToSpend = 0;
    this.classroom = 0;
    this.dutyToGod = 0;
    this.friendToActivity = 0;
    this.friendToChurch = 0;
    this.indexing = 0;
    this.journal = 0;
    this.lesson = 0;
    this.missionPrep = 0;
    this.missionary = 0;
    this.prayer = 0;
    this.scouting = 0;
    this.scripture = 0;
    this.social = 0;
    this.spent = 0;
    this.temple = 0;
    this.testimony = 0;
    this.total = 0;
  }
}

export class ReportPoints {
  key: string;
  type: string;
  date: any;
  pointValue: number;
  constructor(type: string, options?: any) {
    this.type = type;
    this.date = moment().local().format('YYYY-MM-DD');
    switch (type) {
      case 'classroom':
        this.pointValue = 100;
        break;
      case 'dutyToGod':
        this.pointValue = 100;
        break;
      case 'friendToActivity':
        this.pointValue = 200;
        break;
      case 'friendToChurch':
        this.pointValue = 500;
        break;
      case 'indexing':
        this.pointValue = 25;
        break;
      case 'journal':
        this.pointValue = 50;
        break;
      case 'lesson':
        this.pointValue = 100;
        break;
      case 'missionPrep':
        this.pointValue = 250;
        break;
      case 'missionary':
        this.pointValue = 200;
        break;
      case 'prayer':
        this.pointValue = 50;
        break;
      case 'scouting':
        this.pointValue = 50;
        break;
      case 'scripture':
        this.pointValue = 100;
        break;
      case 'temple':
        this.pointValue = 500;
        break;
      case 'testimony':
        this.pointValue = 100;
        break;
      default:
        this.pointValue = 12;
    }
  }

  public setKey() {
    let useDate = moment(this.date).local();
    switch (this.type) {
      case 'classroom':
        this.key = this.type + '-' + useDate.format('YYYY-MM-DD');
        break;
      case 'dutyToGod':
        this.key = this.type + '-' + useDate.format('YYYY-WW');
        break;
      case 'friendToActivity':
        this.key = this.type + '-' + useDate.format('YYYY-WW');
        break;
      case 'friendToChurch':
        this.key = this.type + '-' + useDate.format('YYYY-WW');
        break;
      case 'indexing':
        this.key = this.type + '-' + useDate.format('YYYY-MM-DD');
        break;
      case 'journal':
        this.key = this.type + '-' + useDate.format('YYYY-MM-DD');
        break;
      case 'lesson':
        this.key = this.type + '-' + useDate.format('YYYY-MM-DD');
        break;
      case 'missionPrep':
        this.key = this.type + '-' + useDate.format('YYYY-WW');
        break;
      case 'missionary':
        this.key = this.type + '-' + useDate.format('YYYY-MM-DD');
        break;
      case 'prayer':
        this.key = this.type + '-' + useDate.format('YYYY-MM-DD');
        break;
      case 'scouting':
        this.key = this.type + '-' + useDate.format('YYYY-WW');
        break;
      case 'scripture':
        this.key = this.type + '-' + useDate.format('YYYY-MM-DD');
        break;
      case 'temple':
        this.key = this.type + '-' + useDate.format('YYYY-WW');
        break;
      case 'testimony':
        this.key = this.type + '-' + useDate.format('YYYY-MM-DD');
        break;
      default:
        this.key = this.type + '-' + useDate.format('YYYY-MM-DD');
    }
  }

  public zeroPad(num: number, places?: number) {
    places = places || 0;
    let zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  public makeDayKey(dateStr?: string) {
    if (dateStr) {
      var date = new Date(dateStr);
    } else {
      var date = new Date();
    }
    date.setHours(0);
    let dayKey = date.getDate();
    if (date.getMonth() == 6) {
      dayKey += 30;
    }
    return '2017-' + this.zeroPad(116, 3);
  }

  public makeDateKey(dateStr?: string) {
    if (dateStr) {
      var date = new Date(dateStr);
    } else {
      var date = new Date();
    }
    date.setHours(0);
    return date.toISOString().split('T')[0];
  }

  public makeWeekKey(dateStr?: string) {
    if (dateStr) {
      var date = new Date(dateStr);
    } else {
      var date = new Date();
    }
    date.setHours(0);
    //return date.getWeek();
    return '2017-17';
  }
}

@Injectable()
export class PointsProvider {

  public points: any;
  public userPoints: any;
  constructor(
      private afdb: AngularFireDatabase,
      private data: DataProvider,
      private auth: AuthProvider) {

  }

  getPoints(uid?: string) {
    return Observable.create(observer => {
      if (!uid && !this.auth.uid) {
        observer.error();
      }
      if (!uid) {
        uid = this.auth.uid;
      }
      this.data.list('/points/' + uid).subscribe(pointData => {
        this.userPoints = [];
        pointData.forEach(item => {
          if (!item.$key || !item.$value) {
          } else {
            this.userPoints[item.$key] = item.$value;
          }
        });
        observer.next(this.userPoints);
        //if (pointData) {
        //  this.points = pointData;
        //  observer.next(pointData);
        //} else {
        //  observer.error();
        //}
      }, error => {
        observer.error(error);
      });
    });
  }

  add(reportPoints: ReportPoints, uid?: string) {
    return Observable.create(observer => {
      if (!uid && !this.auth.uid) {
        observer.error();
      }
      if (!uid) {
        uid = this.auth.uid;
      }
      if (!reportPoints || !reportPoints.type) {
        observer.error();
      }
      reportPoints.setKey();
      let key = reportPoints.key;
      reportPoints.key = null;
      this.data.set('/pointLogs/' + uid + '/' + key, reportPoints).subscribe(pointData => {
        this.calculate().subscribe(info => {
          observer.next();
        }, error => {
          observer.error(error);
        });
      }, error => {
        observer.error(error);
      });
    });
  }
  delete(pointId: string, uid?: string) {
    return Observable.create(observer => {
      if (!uid && !this.auth.uid) {
        observer.error();
      }
      if (!uid) {
        uid = this.auth.uid;
      }
      if (!pointId) {
        observer.error();
      }
      this.data.remove('/pointLogs/' + uid + '/' + pointId).subscribe(info => {
        this.calculate().subscribe(info => {
          observer.next();
        }, error => {
          observer.error(error);
        });
      }, error => {
        observer.error(error);
      });
    });
  }
  wipe(uid?: string) {
    // be careful - there is no UNDO from doing this... All Confirmation popups should be handled by page, not this service
    return Observable.create(observer => {
      if (!uid && !this.auth.uid) {
        observer.error();
      }
      if (!uid) {
        uid = this.auth.uid;
      }
      this.data.remove('/pointLogs/' + uid).subscribe(info => {
        this.calculate().subscribe(info => {
          observer.next();
        }, error => {
          observer.error(error);
        });
      }, error => {
        observer.error(error);
      });
    });
  }
  calculate(uid?: string) {
    return Observable.create(observer => {
      if (!uid && !this.auth.uid) {
        observer.error();
      }
      if (!uid) {
        uid = this.auth.uid;
      }
      let userPoints = new UserPoints;
      this.data.getSnapshot('/pointLogs/' + uid).subscribe(snapshot => {
        snapshot.forEach(function(pointSnapshot) {
          var reportPoints = pointSnapshot.val();
          if (!userPoints.total || userPoints.total < 1) {
            userPoints.total = parseInt(reportPoints.pointValue);
          } else {
            userPoints.total += parseInt(reportPoints.pointValue);
          }
          if (!userPoints[reportPoints.type] || userPoints[reportPoints.type] < 1) {
            userPoints[reportPoints.type] = parseInt(reportPoints.pointValue);
          } else {
            userPoints[reportPoints.type] += parseInt(reportPoints.pointValue);
          }
		});
        // now need to calc spent

        // now update
		console.log("Calculated " + userPoints.total + " total points");
		console.log(userPoints);
        this.data.set('/points/' + uid, userPoints).subscribe(info => {
          this.data.set('/users/' + uid + '/totalPoints', userPoints.total).subscribe(info => {
            observer.next();
          }, error => {
            observer.error(error);
          });
        }, error => {
          observer.error(error);
        });
      }, error => {
        observer.error(error);
      });
    });
  }
}
