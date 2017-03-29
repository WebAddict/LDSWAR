import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class Lessons {

  public lessons: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    console.log('Hello Lessons Provider');
  }

}
