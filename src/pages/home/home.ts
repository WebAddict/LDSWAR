import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items = [];
  private count = 1;

  constructor(public navCtrl: NavController) {

  }

  addItem(){
	this.items.push({title: 'hi' + this.count, description: 'test' + this.count});
	this.count++;
  }
 
  viewItem(){
 
  }
  ionViewDidLoad(){
	this.addItem();
 
  }
}
