import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class DataProvider {
  constructor(
      private af: AngularFire) {
  
  }

  push(path: string, data: any): Observable<any> {
    return Observable.create(observer => {
      this.af.database.list(path).push(data).then(firebaseNewData => {
        // Return the uid created
        let newData: any = firebaseNewData;
        observer.next(newData.path.o[newData.path.o.length - 1]);
      }, error => {
        observer.error(error);
      });
    });
  }

  getSnapshot(path: string): Observable<any> {
    return Observable.create(observer => {
      let snapshotRef = firebase.database().ref(path);
      snapshotRef.on('value', function(snapshot) {
        observer.next(snapshot);
        //updateStarCount(postElement, snapshot.val());
      });
    });
  }

  update(path: string, data: any): Observable<any> {
    return Observable.create(observer => {
    this.af.database.object(path).update(data).then(() => {
        observer.next(true);
      }, error => {
        observer.error(error);
      });
    });
  }

  list(path: string): FirebaseListObservable<any> {
    return this.af.database.list(path);
  }

  object(path: string): FirebaseObjectObservable<any> {
    return this.af.database.object(path);
  }

  remove(path: string): Observable<any> {
    return Observable.create(observer => {
      this.af.database.object(path).remove().then(data => {
        observer.next();
      }, error => {
        observer.error(error);
      });
    });
  }
}