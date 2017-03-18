import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-missionaries',
  templateUrl: 'missionaries.html'
})
export class MissionariesPage {
  missionaries: FirebaseListObservable<any[]>;
  missions: FirebaseListObservable<any[]>;
  //let lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King"];

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
    this.missionaries = af.database.list('/missionaries');
    this.missions = af.database.list('/missions');
  }

  addMissionary(){
      this.missionaries.push({'lastName': "Williams", 'missionName': "Random Mission"});
  }
 
  viewMissionary(){
 
  }
  ionViewDidLoad(){
    //this.addMissionary();
    //console.log('ionViewDidLoad MissionariesPage');
 
  }

}
