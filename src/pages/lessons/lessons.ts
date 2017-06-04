import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { LessonsUpdatePage } from './update/update';
import { LessonsDetailPage } from './detail/detail';
import { LessonsAddPage } from './add/add';

@Component({
  selector: 'page-lessons',
  templateUrl: 'lessons.html'
})
export class LessonsPage {

  public lessons: FirebaseListObservable<any[]>;
  public lessonRoot: string = '/organization/allenRanch/'; // end with a slash
  public view: any;
  public viewCards: boolean = true;
  public viewList: boolean = false;
  public canShowView: boolean = true;
  public canShowFilter: boolean = false;
  public canAddLesson: boolean = false;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      afdb: AngularFireDatabase) {

    let which = navParams.get('which');
    if (which == 'organization') {
      this.lessonRoot = "/organization/allenRanch/";
    }
    this.lessons = afdb.list(this.lessonRoot + 'lessons');
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
