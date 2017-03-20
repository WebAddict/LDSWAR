import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html'
})
export class RewardsPage {

  rewards: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
    this.rewards = af.database.list('/rewards');
  }

  addReward(){
      //this.lessons.push({'lastName': "Williams", 'missionName': "Random Mission"});
  }
 
  viewReward(){
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardsPage');
  }

}
