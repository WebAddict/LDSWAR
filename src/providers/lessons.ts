import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from './auth';
import { DataProvider } from './data';

@Injectable()
export class Lessons {

  public lessons: any;
  constructor(
      private af: AngularFire,
      private data: DataProvider,
      private auth: AuthProvider) {

  }

  getFBLessons() {
        this.data.list('lessons').subscribe(data => {
          console.log(data);
        });
  }

  getLessons() {
    return Observable.create(observer => {
      this.data.list('lessons').subscribe(lessonData => {
        if (lessonData) {
	  this.lessons = lessonData;
          observer.next(lessonData);
        } else {
          observer.error();
        }
      });
    });
  }

}
