import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthProvider } from '../../../providers/auth';
import { DataProvider } from '../../../providers/data';


@Component({
  selector: 'page-add-lessons',
  templateUrl: 'add.html'
})
export class LessonsAddPage {

  public lesson: {title: string, description: string, uid: string} = {
    title: '',
    description: '',
    uid: ''
  };
  public user: any;

  public lessons: FirebaseListObservable<any[]>;
  constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      private afdb: AngularFireDatabase,
      public data: DataProvider,
      public auth: AuthProvider) {

    //this.lessons = afdb.list('/lessons');
    this.auth.getUserData().subscribe(userData => {
      this.user = userData;
      this.lesson.uid = userData.$key;
      console.log('Set user uid to ', userData);
    }, err => {
      console.log(err)
    });
  }

  save() {
    this.data.push('/lessons', this.lesson).subscribe(key => {
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
