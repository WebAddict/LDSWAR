import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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

@Injectable()
export class Points {

  public points: any;
  constructor(
      private af: AngularFire,
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

  add(pointInfo, uid) {
    if (!uid) {
      //uid = $rootScope.uid;
    }
    if (!pointInfo || !pointInfo.type) {
      return false;
    }
  }

}
