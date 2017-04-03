import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { LessonsUpdatePage } from './update/update';
import { LessonsDetailPage } from './detail/detail';

@Component({
  selector: 'page-lessons',
  templateUrl: 'lessons.html'
})
export class LessonsPage {

  public lessons: FirebaseListObservable<any[]>;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      af: AngularFire) {

    this.lessons = af.database.list('/lessons');
  }

  addLesson(){
    //this.lessons.push({'lastName': "Williams", 'missionName': "Random Mission"});
    this.navCtrl.push(LessonsUpdatePage);
  }
 
  viewLesson(lesson){
    //let subscription = this.af.database.object('someLocation').subscribe(data=> {
      //do something with your data
    //})
    //subscription.unsubscribe();
    this.navCtrl.push(LessonsDetailPage, lesson);
  }
  ionViewDidLoad(){
    //this.addLesson();
    //console.log('ionViewDidLoad LessonsPage');
  }

}
