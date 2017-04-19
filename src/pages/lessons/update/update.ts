import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthProvider } from '../../../providers/auth';
import { DataProvider } from '../../../providers/data';


@Component({
  selector: 'page-update-lessons',
  templateUrl: 'update.html'
})
export class LessonsUpdatePage {

  public user: any;
  public lesson: FirebaseObjectObservable<any[]>;
  lessonPath: string;

  constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      private afdb: AngularFireDatabase,
      public data: DataProvider,
      public auth: AuthProvider) {

    let lessonId = navParams.get('$key');
    this.lessonPath = 'lessons/' + lessonId;
    //this.lesson = afdb.object(lessonPath);
    this.data.getSnapshot(this.lessonPath).subscribe(data => {
      //console.log(data);
      this.lesson = data.val();
    }, err => {
    });
    this.auth.getUserData().subscribe(userData => {
      this.user = userData;
      //this.lesson.uid = userData.$key;
      console.log('Set user uid to ', userData);
    }, err => {
      console.log(err)
    });
  }

  save() {
    this.data.update(this.lessonPath, this.lesson).subscribe(key => {
      console.log('saved', key);
      this.navCtrl.pop();
    }, err => {
      console.log(err)
    });
  }

  addLesson(){
    //this.lessons.push({'lastName': "Williams", 'missionName': "Random Mission"});
  }
 
  viewLesson(lesson){
    //let subscription = this.afdb.object('someLocation').subscribe(data=> {
      //do something with your data
    //})
    //subscription.unsubscribe();
  }
  ionViewDidLoad(){
    //this.addLesson();
    //console.log('ionViewDidLoad LessonsPage');
  }

}
