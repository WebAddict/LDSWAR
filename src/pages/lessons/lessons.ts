import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { UpdateLessonsPage } from './update/update';

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
    this.navCtrl.push(UpdateLessonsPage);
  }
 
  viewLesson(lesson){
    //let subscription = this.af.database.object('someLocation').subscribe(data=> {
      //do something with your data
    //})
    //subscription.unsubscribe();
  }
  ionViewDidLoad(){
    //this.addLesson();
    //console.log('ionViewDidLoad LessonsPage');
  }

}
