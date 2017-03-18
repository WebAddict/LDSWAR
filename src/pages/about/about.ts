import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  lessons: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, af: AngularFire) {

      this.lessons = af.database.list('/lessons');
  }

  addLesson(){
	//this.items.push({title: 'hi' + this.count, description: 'test' + this.count});
	//this.count++;
	//var date = Date.now();
	//var lesson = {'title': 'another lesson ' + date, 'description': 'another lesson ' + date}
  }
 
  viewLesson(){
 
  }

  ionViewDidLoad(){
	this.addLesson();
 
  }
}
