import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user2;
  public hits: number;

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    storage: Storage) {

    storage.get('totalHits').then((val) => {
      console.log("got " + val + " hits from storage");
      if (val && val > 0) {
        this.hits = val + 1;
      } else {
        this.hits = 1;
      }
      storage.set('totalHits', this.hits);
    })

  }

  addItem(){
  }
 
  viewItem(){
 
  }
  ionViewDidLoad(){
 
  }
}
