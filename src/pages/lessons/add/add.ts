import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthProvider } from '../../../providers/auth';
import { DataProvider } from '../../../providers/data';


@Component({
  selector: 'page-add-lessons',
  templateUrl: 'add.html'
})
export class LessonsAddPage {

  public lesson: any = {};

  constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      private afdb: AngularFireDatabase,
      public data: DataProvider,
      public auth: AuthProvider) {

    this.lesson.uid = auth.uid;
  }

  save() {
    this.data.push('/lessons', this.lesson).subscribe(key => {
      console.log('saved', key);
      this.navCtrl.pop();
    }, err => {
      console.log(err)
    });
  }

}
