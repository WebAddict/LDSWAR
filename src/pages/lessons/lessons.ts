import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { LessonsUpdatePage } from './update/update';
import { LessonsDetailPage } from './detail/detail';
import { LessonsAddPage } from './add/add';

@Component({
  selector: 'page-lessons',
  templateUrl: 'lessons.html'
})
export class LessonsPage {

  public lessons: FirebaseListObservable<any[]>;
  public view: any;
  public viewCards: boolean = false;
  public viewList: boolean = true;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      af: AngularFire) {

    this.lessons = af.database.list('/lessons');
  }

  addLesson(){
    this.navCtrl.push(LessonsAddPage);
  }
  editLesson(lesson){
    this.navCtrl.push(LessonsUpdatePage, lesson);
  }
  viewLesson(lesson){
    this.navCtrl.push(LessonsDetailPage, lesson);
  }
  deleteLesson(lesson){
    this.lessons.remove(lesson);
  }
  ionViewDidLoad(){
    //this.addLesson();
    //console.log('ionViewDidLoad LessonsPage');
  }
  showFilter() {
  }
  showView() {
    if (this.viewCards) {
      this.viewCards = false;
      this.viewList = true;
    } else {
      this.viewCards = true;
      this.viewList = false;
    }
  }

}
