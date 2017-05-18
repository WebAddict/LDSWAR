import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

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
      afdb: AngularFireDatabase,
      public sanitizer: DomSanitizer) {

    console.log(navParams);
    let lessonId = navParams.get('$key');
    let lessonPath = 'lessons/' + lessonId;
    //console.log('lesson id ' + lessonId);
    //console.log('lesson path ' + lessonPath);
    //this.lesson = this.data.object(lessonPath);
    //this.lesson = afdb.object(lessonPath);
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
