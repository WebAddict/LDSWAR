import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-missionaries',
  templateUrl: 'missionaries.html'
})
export class MissionariesPage {
  public missionaries = [];
  private count = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  addMissionary(){
	this.missionaries.push({title: 'Elder #' + this.count, description: 'This is Elder ' + this.count + ' from Gilbert'});
	this.count++;
  }
 
  viewMissionary(){
 
  }
  ionViewDidLoad(){
    this.addMissionary();
    console.log('ionViewDidLoad MissionariesPage');
 
  }

}
