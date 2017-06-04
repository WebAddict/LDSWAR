import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html'
})
export class RewardsPage {

  rewards: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, afdb: AngularFireDatabase) {
    this.rewards = afdb.list('/rewards');
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
