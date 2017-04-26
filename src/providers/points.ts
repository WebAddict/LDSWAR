import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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
    this.date = new Date;
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
}

@Injectable()
export class PointsProvider {

  public points: any;
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
        if (pointData) {
          this.points = pointData;
          observer.next(pointData);
        } else {
          observer.error();
        }
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
      this.data.push('/points/' + uid + '/history', reportPoints).subscribe(pointData => {
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
      this.data.remove('/points/' + uid + '/history/' + pointId).subscribe(info => {
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
    return Observable.create(observer => {
      if (!uid && !this.auth.uid) {
        observer.error();
      }
      if (!uid) {
        uid = this.auth.uid;
      }
      this.data.remove('/points/' + uid + '/history').subscribe(info => {
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
      this.data.getSnapshot('/points/' + uid + '/history').subscribe(snapshot => {
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
        this.data.update('/points/' + uid, userPoints).subscribe(info => {
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
