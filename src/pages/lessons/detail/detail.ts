import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { DataProvider } from '../../../providers/data';

@Component({
  selector: 'page-lessons-detail',
  templateUrl: 'detail.html'
})
export class LessonsDetailPage {
  public lesson: FirebaseObjectObservable<any>;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private data: DataProvider,
      af: AngularFire) {

    console.log(navParams);
    let lessonId = navParams.get('$key');
    let lessonPath = 'lessons/' + lessonId;
    //console.log('lesson id ' + lessonId);
    //console.log('lesson path ' + lessonPath);
    //this.lesson = this.data.object(lessonPath);
    //this.lesson = af.database.object(lessonPath);
    //af.database.object(lessonPath).then((data) => {
    //  this.lesson = data;
    //  console.log(data);
    //});
    //this.data.object('/lessons/' + lessonId).then((data) => {
    //  this.lesson = data;
    //  console.log(data);
    //});
    this.data.getSnapshot(lessonPath).subscribe(data => {
      //console.log(data);
      this.lesson = data.val();
    }, err => {
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonsDetailPage');
  }

}
