import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from './auth';
import { DataProvider } from './data';

interface UserPoints {
  availableToSpend?: number;
  classroomPoints?: number;
  dutyToGodPoints?: number;
  friendToActivityPoints?: number;
  friendToChurchPoints?: number;
  indexingPoints?: number;
  journalPoints?: number;
  lessonPoints?: number;
  missionPrepPoints?: number;
  missionaryPoints?: number;
  scoutingPoints?: number;
  scripturePoints?: number;
  socialPoints?: number;
  templePoints?: number;
  testimonyPoints?: number;
  totalPoints?: number;
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
  userPoints
  constructor(
      private afdb: AngularFireDatabase,
      private data: DataProvider,
      private auth: AuthProvider) {

  }

  getPoints() {
    return Observable.create(observer => {
      this.data.list('points').subscribe(pointData => {
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
      let totalPoints = 0;
      this.data.getSnapshot('/points/' + uid + '/history').subscribe(snapshot => {
        snapshot.forEach(function(pointSnapshot) {
          var pointInfo = pointSnapshot.val();
          totalPoints += pointInfo.pointValue;
		});
		console.log("Calculated " + totalPoints + " points");
        this.data.set('/points/' + uid + '/totalPoints', totalPoints).subscribe(info => {
          observer.next();
        }, error => {
          observer.error(error);
        });
      }, error => {
        observer.error(error);
      });
    });
  }

}
