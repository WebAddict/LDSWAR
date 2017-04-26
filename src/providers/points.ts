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

export class Point {
    reportingType: string;
    title: string;
    uid: string;
    pointValue: number;
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

  add(pointInfo: Point, uid?: string) {
    return Observable.create(observer => {
      if (!uid && !this.auth.uid) {
        observer.error();
      }
      if (!uid) {
        uid = this.auth.uid;
      }
      if (!pointInfo || !pointInfo.reportingType) {
        observer.error();
      }
      this.data.push('/points/' + uid + '/history', pointInfo).subscribe(pointData => {
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
          var pointInfo = pointSnapshot.val();
          if (!userPoints.total) {
            userPoints.total = pointInfo.pointValue;
          } else {
            userPoints.total += pointInfo.pointValue;
          }
          if (!userPoints[pointInfo.reportingType]) {
            userPoints[pointInfo.reportingType] = pointInfo.pointValue;
          } else {
            userPoints[pointInfo.reportingType] += pointInfo.pointValue;
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
