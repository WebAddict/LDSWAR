import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class DataProvider {
  constructor(
      private fbApp: FirebaseApp,
      private afdb: AngularFireDatabase) {
  
  }

  push(path: string, data: any): Observable<any> {
    return Observable.create(observer => {
      this.afdb.list(path).push(data).then(firebaseNewData => {
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
      snapshotRef.once('value', function(snapshot) {
        observer.next(snapshot);
      });
    });
  }

  update(path: string, data: any): Observable<any> {
    return Observable.create(observer => {
      this.afdb.object(path).update(data).then(() => {
        observer.next(true);
      }, error => {
        observer.error(error);
      });
    });
  }

  set(path: string, data: any): Observable<any> {
    return Observable.create(observer => {
      this.afdb.object(path).set(data).then(() => {
        observer.next(true);
      }, error => {
        observer.error(error);
      });
    });
  }

  list(path: string, query?: any): FirebaseListObservable<any> {
    return this.afdb.list(path, query);
  }

  object(path: string): FirebaseObjectObservable<any> {
    return this.afdb.object(path);
  }

  remove(path: string): Observable<any> {
    return Observable.create(observer => {
      this.afdb.object(path).remove().then(data => {
        observer.next();
      }, error => {
        observer.error(error);
      });
    });
  }
}